import { NextResponse } from 'next/server';

interface GitHubStats {
    public_repos?: number;
    followers?: number;
    following?: number;
}

interface GitHubEvent {
    id: string;
    type: string;
    repo?: { name: string };
    created_at?: string;
    payload?: {
        message?: string;
        commits?: Array<{ message?: string }>;
    };
}

interface GitHubRepo {
    full_name: string;
    updated_at?: string;
}

interface GitHubCommit {
    sha: string;
    commit?: {
        message?: string;
        author?: {
            date?: string;
        };
    };
}

interface GitHubData {
    stats: GitHubStats;
    events: GitHubEvent[];
}

function getHeaders() {
    return {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'blissfolio/1.0 (+https://blissfolio.com)',
    };
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username')?.trim();

    if (!username) {
        return NextResponse.json(
            { error: 'A GitHub username is required.' },
            { status: 400 },
        );
    }

    try {
        const [statsResponse, eventsResponse, reposResponse] =
            await Promise.all([
                fetch(
                    `https://api.github.com/users/${encodeURIComponent(username)}`,
                    {
                        headers: getHeaders(),
                        next: { revalidate: 60 * 60 },
                    },
                ),
                fetch(
                    `https://api.github.com/users/${encodeURIComponent(username)}/events/public`,
                    {
                        headers: getHeaders(),
                        next: { revalidate: 60 * 60 },
                    },
                ),
                fetch(
                    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=5&sort=updated`,
                    {
                        headers: getHeaders(),
                        next: { revalidate: 60 * 60 },
                    },
                ),
            ]);

        const stats = statsResponse.ok ? await statsResponse.json() : {};
        const events = eventsResponse.ok ? await eventsResponse.json() : [];
        const repos = reposResponse.ok ? await reposResponse.json() : [];

        const commitFeed = Array.isArray(repos)
            ? (
                  await Promise.all(
                      repos.slice(0, 5).map(async (repo: GitHubRepo) => {
                          const commitsResponse = await fetch(
                              `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`,
                              {
                                  headers: getHeaders(),
                                  next: { revalidate: 60 * 60 },
                              },
                          );

                          if (!commitsResponse.ok) {
                              return null;
                          }

                          const commits =
                              (await commitsResponse.json()) as GitHubCommit[];
                          const latestCommit = commits[0];

                          if (!latestCommit) {
                              return null;
                          }

                          return {
                              id: `${repo.full_name}-${latestCommit.sha}`,
                              type: 'Push',
                              repo: { name: repo.full_name },
                              created_at:
                                  latestCommit.commit?.author?.date ||
                                  repo.updated_at ||
                                  '',
                              payload: {
                                  message:
                                      latestCommit.commit?.message ||
                                      'Latest commit',
                              },
                          } satisfies GitHubEvent;
                      }),
                  )
              ).filter(Boolean)
            : [];

        const combinedEvents = [
            ...(Array.isArray(events) ? events : []),
            ...commitFeed,
        ]
            .sort((a, b) => {
                const aTime = new Date(a.created_at ?? 0).getTime();
                const bTime = new Date(b.created_at ?? 0).getTime();
                return bTime - aTime;
            })
            .slice(0, 5);

        const payload: GitHubData = {
            stats: stats || {},
            events: combinedEvents,
        };

        return NextResponse.json(payload);
    } catch (error) {
        console.error('Failed to fetch GitHub data', error);
        return NextResponse.json({ stats: {}, events: [] }, { status: 500 });
    }
}

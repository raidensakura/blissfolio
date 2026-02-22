import { FaGithub } from 'react-icons/fa';

export default function Footer() {
	return (
		<footer className="bg-[var(--background)] border-t border-purple-500/20 py-6">
			<div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
				{/* Left: copyright */}
				<p className="text-gray-400 text-sm">
					Made by Raiden, inspired by <a className="text-purple-400 hover:underline" href="https://z1.gg/">Thusuzzee</a>.
				</p>

				{/* Right: social links */}
				<div className="flex gap-4 text-gray-400">
					<a
                        className="hover:text-purple-400 transition-colors"
						href="https://github.com/raidensakura/blissfolio"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaGithub size={20} />
					</a>
                    <p className="text-sm">Source code available on GitHub</p>
				</div>
			</div>
		</footer>
	);
}

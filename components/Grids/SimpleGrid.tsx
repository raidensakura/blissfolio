export default function SimpleGrid({ items }: any) {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            {items.map((item: string) => (
                <div key={item} className="card">
                    {item}
                </div>
            ))}
        </div>
    );
}

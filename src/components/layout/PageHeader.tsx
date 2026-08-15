export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <h1 className="listing-title">{title}</h1>
      {description && (
        <p className="mt-1.5 max-w-[900px] text-[14px] leading-[21px] text-[#34495e]">
          {description}
        </p>
      )}
    </div>
  );
}

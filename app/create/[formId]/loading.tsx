import FormItemSkeleton from "@/components/form-item-skeleton";

export default function FormLoading() {
  return (
    <>
      <div className="divide-border-200 divide-y rounded-md border">
        <FormItemSkeleton />
        <FormItemSkeleton />
        <FormItemSkeleton />
        <FormItemSkeleton />
      </div>
    </>
  );
}

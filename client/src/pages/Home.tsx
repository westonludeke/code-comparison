import { CodeComparison } from "@/components/CodeComparison";

export function Home() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-4xl font-bold mb-8">Code Comparison</h1>
      <CodeComparison />
    </div>
  );
}
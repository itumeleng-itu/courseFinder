import fs from 'fs';
import path from 'path';
import MatricResultsClient from '@/components/matric-results/matric-results-client';
import { DashboardSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default async function MatricResultsPage() {
  const filePath = path.join(process.cwd(), 'data', 'school-performance.json');
  let schools = [];
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    schools = JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to load school performance data', error);
  }

  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <MatricResultsClient schools={schools} />
      </SidebarInset>
    </>
  );
}

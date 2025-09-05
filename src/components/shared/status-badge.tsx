import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles: Record<string, string> = {
    'Active': 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
    'Inactive': 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100',
    'Training': 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100',
    'Degraded': 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100',
    'Pending Approval': 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100',
    'Approved': 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
    'Rejected': 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100',
    'Completed': 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
    'Processing': 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100',
    'Queued': 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100'
  };

  return (
    <Badge variant="outline" className={cn("border", statusStyles[status] || statusStyles['Inactive'])}>
      {status}
    </Badge>
  );
}

import { Badge } from "@/components/ui/badge";

interface RiskBadgeProps {
  level: 'High' | 'Medium' | 'Low';
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const variant = {
    High: 'destructive',
    Medium: 'secondary',
    Low: 'default',
  }[level] as 'destructive' | 'secondary' | 'default';

  const lowStyle = {
    backgroundColor: 'hsl(var(--accent))',
    color: 'hsl(var(--accent-foreground))',
    borderColor: 'transparent',
  };

  return (
    <Badge variant={variant} style={level === 'Low' ? lowStyle : {}} className="capitalize">
      {level}
    </Badge>
  );
}

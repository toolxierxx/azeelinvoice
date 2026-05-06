import React from 'react';
import { CheckCircle, FileText, AlertTriangle, Send, Clock } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface ActivityItem {
  id: string;
  type: string;
  message: string;
  amount: string;
  time: string;
  color: string;
}

const typeIcons: Record<string, React.ElementType> = {
  paid: CheckCircle,
  created: FileText,
  overdue: AlertTriangle,
  sent: Send,
  pending: Clock,
};

const typeBg: Record<string, string> = {
  paid: 'bg-green/10',
  created: 'bg-primary/10',
  overdue: 'bg-red/10',
  sent: 'bg-sky/10',
  pending: 'bg-amber/10',
};

export default function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="p-4 flex flex-col gap-3 overflow-y-auto scrollbar-thin max-h-96">
      {items.map((item) => {
        const Icon = typeIcons[item.type] || FileText;
        return (
          <div
            key={item.id}
            className="flex gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors group"
          >
            <div className={`w-8 h-8 rounded-lg ${typeBg[item.type] || 'bg-muted'} flex items-center justify-center shrink-0 mt-0.5`}>
              <Icon size={14} className={item.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground leading-relaxed">{item.message}</p>
              <div className="flex items-center justify-between mt-1 gap-2">
                <span className={`text-xs font-700 tabular-nums ${item.color}`}>{item.amount}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
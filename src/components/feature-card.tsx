import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <Card className="bg-gray-800 border-gray-700 h-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
    <CardHeader>
      <Icon className="w-12 h-12 mb-4 text-blue-400" />
      <CardTitle className="text-xl text-neutral-100">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-400">{description}</p>
    </CardContent>
  </Card>
);

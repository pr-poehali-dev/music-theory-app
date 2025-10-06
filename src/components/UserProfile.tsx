import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  user: {
    name: string;
    level: number;
    experience: number;
    maxExperience: number;
    badges: string[];
    lessonsCompleted: number;
    adaptiveLevel: 'beginner' | 'intermediate' | 'advanced';
  };
}

const UserProfile = ({ user }: UserProfileProps) => {
  const levelColor = {
    beginner: 'bg-yellow-100 text-yellow-800',
    intermediate: 'bg-blue-100 text-blue-800',
    advanced: 'bg-red-100 text-red-800',
  }[user.adaptiveLevel];

  const levelText = {
    beginner: 'Новичок',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  }[user.adaptiveLevel];

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>Уровень {user.level}</CardDescription>
            </div>
          </div>
          <Badge className={levelColor}>
            {levelText}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Опыт</span>
            <span className="text-sm font-bold text-primary">
              {user.experience}/{user.maxExperience} XP
            </span>
          </div>
          <Progress value={(user.experience / user.maxExperience) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{user.lessonsCompleted}</div>
            <div className="text-xs text-muted-foreground">Уроков пройдено</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-secondary">{user.badges.length}</div>
            <div className="text-xs text-muted-foreground">Наград получено</div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Награды:</p>
          <div className="flex flex-wrap gap-2">
            {user.badges.map((badge, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-gradient-to-br from-accent to-accent/50 rounded-full flex items-center justify-center text-xl hover-scale cursor-pointer"
                title={badge}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
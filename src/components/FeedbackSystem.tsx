import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface FeedbackSystemProps {
  stats: {
    correctAnswers: number;
    totalQuestions: number;
    currentStreak: number;
    timeSpent: number;
    adaptiveLevel: 'beginner' | 'intermediate' | 'advanced';
  };
}

const FeedbackSystem = ({ stats }: FeedbackSystemProps) => {
  const accuracy = Math.round((stats.correctAnswers / stats.totalQuestions) * 100) || 0;
  
  const getPerformanceLevel = () => {
    if (accuracy >= 90) return { text: 'Отлично!', color: 'text-blue-600', icon: 'TrophyIcon' };
    if (accuracy >= 70) return { text: 'Хорошо!', color: 'text-blue-600', icon: 'ThumbsUp' };
    if (accuracy >= 50) return { text: 'Неплохо', color: 'text-yellow-600', icon: 'Star' };
    return { text: 'Нужна практика', color: 'text-red-600', icon: 'Target' };
  };

  const performance = getPerformanceLevel();

  const getAdaptiveRecommendation = () => {
    if (accuracy >= 85 && stats.currentStreak >= 3) {
      return {
        message: '🚀 Ты отлично справляешься! Рекомендуем перейти на следующий уровень сложности.',
        action: 'Повысить уровень',
        color: 'bg-blue-50 border-blue-200 text-blue-800'
      };
    }
    if (accuracy < 50 && stats.totalQuestions >= 5) {
      return {
        message: '💡 Кажется, материал даётся сложно. Рекомендуем вернуться к теории или снизить уровень.',
        action: 'Повторить теорию',
        color: 'bg-red-50 border-red-200 text-red-800'
      };
    }
    return {
      message: '👍 Продолжай в том же духе! Текущий уровень сложности подходит тебе.',
      action: 'Продолжить обучение',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    };
  };

  const recommendation = getAdaptiveRecommendation();

  return (
    <div className="space-y-4">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={24} className="text-primary" />
            Обратная связь
          </CardTitle>
          <CardDescription>Твоя статистика и рекомендации</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Точность ответов</span>
              <span className={`text-2xl font-bold ${performance.color}`}>
                {accuracy}%
              </span>
            </div>
            <Progress value={accuracy} className="h-3 mb-2" />
            <p className={`text-sm font-medium ${performance.color}`}>
              {performance.text}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <Icon name="CheckCircle" size={24} className="text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{stats.correctAnswers}</div>
              <div className="text-xs text-blue-600">Правильно</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
              <Icon name="Flame" size={24} className="text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-700">{stats.currentStreak}</div>
              <div className="text-xs text-red-600">Подряд</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
              <Icon name="Clock" size={24} className="text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-700">{stats.timeSpent}</div>
              <div className="text-xs text-yellow-600">Минут</div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-2 ${recommendation.color}`}>
            <div className="flex items-start gap-3">
              <Icon name="Lightbulb" size={24} className="flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="font-medium">{recommendation.message}</p>
                <Badge className="bg-primary text-white hover:bg-primary/90">
                  {recommendation.action}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              Адаптивный алгоритм
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Текущий уровень:</span>
                <Badge variant="outline">
                  {stats.adaptiveLevel === 'beginner' && '🌱 Новичок'}
                  {stats.adaptiveLevel === 'intermediate' && '🌿 Средний'}
                  {stats.adaptiveLevel === 'advanced' && '🌳 Продвинутый'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Система автоматически подбирает сложность заданий на основе твоих результатов
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackSystem;
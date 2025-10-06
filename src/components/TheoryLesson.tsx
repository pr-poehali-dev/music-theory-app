import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface TheoryLessonProps {
  lesson: {
    id: number;
    title: string;
    content: string[];
    images?: string[];
    progress: number;
  };
  onComplete: () => void;
}

const TheoryLesson = ({ lesson, onComplete }: TheoryLessonProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-secondary/30">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-primary/10">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{lesson.title}</CardTitle>
              <CardDescription>Теоретический материал</CardDescription>
            </div>
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="BookOpen" size={24} className="text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {lesson.content.map((paragraph, index) => (
            <p key={index} className="text-foreground/80 leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Icon name="Piano" size={20} className="text-primary" />
              Клавиатура фортепиано
            </h3>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-center items-end gap-0.5">
                {['До', 'Ре', 'Ми', 'Фа', 'Соль', 'Ля', 'Си'].map((note, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-12 h-32 bg-white border-2 border-gray-800 rounded-b-md flex items-end justify-center pb-2 hover:bg-gray-100 cursor-pointer transition-colors">
                      <span className="text-xs font-semibold">{note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Прогресс изучения</span>
              <span className="text-sm font-bold text-primary">{lesson.progress}%</span>
            </div>
            <Progress value={lesson.progress} className="h-2 mb-4" />
            
            <Button 
              onClick={onComplete}
              className="w-full bg-secondary hover:bg-secondary/90 text-white"
              size="lg"
            >
              <Icon name="CheckCircle" className="mr-2" size={20} />
              Завершить теорию и перейти к практике
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TheoryLesson;

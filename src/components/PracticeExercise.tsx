import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface PracticeExerciseProps {
  exercise: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  onAnswer: (isCorrect: boolean) => void;
}

const PracticeExercise = ({ exercise, onAnswer }: PracticeExerciseProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    const isCorrect = index === exercise.correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 2000);
  };

  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  }[exercise.difficulty];

  const difficultyText = {
    easy: 'Легко',
    medium: 'Средне',
    hard: 'Сложно',
  }[exercise.difficulty];

  return (
    <Card className="border-2 border-primary/30">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl mb-2">Практическое задание</CardTitle>
            <CardDescription>Проверь свои знания на практике</CardDescription>
          </div>
          <Badge className={difficultyColor}>
            {difficultyText}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="HelpCircle" size={20} className="text-white" />
            </div>
            <p className="text-lg font-medium">{exercise.question}</p>
          </div>
        </div>

        <div className="space-y-3">
          {exercise.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === exercise.correctAnswer;
            const showCorrect = showFeedback && isCorrect;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                variant="outline"
                className={`w-full justify-start text-left h-auto py-4 px-6 text-base transition-all ${
                  showCorrect ? 'bg-green-100 border-green-500 text-green-800' :
                  showIncorrect ? 'bg-red-100 border-red-500 text-red-800' :
                  'hover:bg-primary/5 hover:border-primary'
                }`}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    showCorrect ? 'border-green-500 bg-green-500' :
                    showIncorrect ? 'border-red-500 bg-red-500' :
                    'border-gray-300'
                  }`}>
                    {showCorrect && <Icon name="Check" size={16} className="text-white" />}
                    {showIncorrect && <Icon name="X" size={16} className="text-white" />}
                    {!showFeedback && <span className="text-sm font-bold">{String.fromCharCode(65 + index)}</span>}
                  </div>
                  <span>{option}</span>
                </div>
              </Button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={`p-4 rounded-lg flex items-center gap-3 ${
            selectedAnswer === exercise.correctAnswer 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            <Icon 
              name={selectedAnswer === exercise.correctAnswer ? 'CheckCircle2' : 'XCircle'} 
              size={24} 
              className={selectedAnswer === exercise.correctAnswer ? 'text-green-600' : 'text-red-600'} 
            />
            <p className="font-medium">
              {selectedAnswer === exercise.correctAnswer 
                ? '🎉 Отлично! Правильный ответ!' 
                : '❌ Неправильно. Попробуй ещё раз в следующий раз!'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PracticeExercise;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProfile from '@/components/UserProfile';
import TheoryLesson from '@/components/TheoryLesson';
import PracticeExercise from '@/components/PracticeExercise';
import FeedbackSystem from '@/components/FeedbackSystem';
import VirtualPiano from '@/components/VirtualPiano';

const Index = () => {
  const [userProgress, setUserProgress] = useState(35);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [stats, setStats] = useState({
    correctAnswers: 0,
    totalQuestions: 0,
    currentStreak: 0,
    timeSpent: 15,
    adaptiveLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced'
  });
  
  const [userData, setUserData] = useState({
    name: 'Алекс',
    level: 3,
    experience: 450,
    maxExperience: 1000,
    badges: ['🏆', '⭐', '🎹'],
    lessonsCompleted: 12,
    adaptiveLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced'
  });

  const theoryLesson = {
    id: 1,
    title: 'Основы нотной грамоты',
    content: [
      'Ноты — это символы, которые обозначают звуки в музыке. На фортепиано существует 7 основных нот: До, Ре, Ми, Фа, Соль, Ля, Си.',
      'Каждая нота соответствует определённой клавише на клавиатуре. Белые клавиши — это основные ноты, а чёрные — полутоны.',
      'Чтобы начать играть, важно запомнить расположение ноты "До" — это белая клавиша слева от группы из двух чёрных клавиш.'
    ],
    progress: 65
  };

  const practiceQuestions = [
    {
      id: 1,
      question: 'Какая нота находится слева от группы из двух чёрных клавиш?',
      options: ['До', 'Ре', 'Ми', 'Фа'],
      correctAnswer: 0,
      difficulty: 'easy' as const
    },
    {
      id: 2,
      question: 'Сколько основных нот существует в музыке?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 2,
      difficulty: 'easy' as const
    },
    {
      id: 3,
      question: 'Какой цвет клавиш обозначает полутоны?',
      options: ['Белый', 'Чёрный', 'Серый', 'Красный'],
      correctAnswer: 1,
      difficulty: 'medium' as const
    }
  ];

  const handleAnswer = (isCorrect: boolean) => {
    setStats(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      totalQuestions: prev.totalQuestions + 1,
      currentStreak: isCorrect ? prev.currentStreak + 1 : 0
    }));
    
    if (currentQuestion < practiceQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLearning(true);
  };

  const levels = [
    { id: 1, title: 'Знакомство с клавишами', difficulty: 'Легко', stars: 3, icon: 'Piano', locked: false, description: 'Расположение нот на клавиатуре' },
    { id: 2, title: 'Правая рука: До-Ре-Ми', difficulty: 'Легко', stars: 2, icon: 'Hand', locked: false, description: 'Первые ноты и аппликатура' },
    { id: 3, title: 'Левая рука: басовый ключ', difficulty: 'Средне', stars: 1, icon: 'Music2', locked: false, description: 'Изучение нот в басовом ключе' },
    { id: 4, title: 'Две руки вместе', difficulty: 'Средне', stars: 0, icon: 'HandHeart', locked: true, description: 'Координация обеих рук' },
    { id: 5, title: 'Простые мелодии', difficulty: 'Сложно', stars: 0, icon: 'Award', locked: true, description: 'Игра известных детских песен' },
  ];

  const reviews = [
    { name: 'Анна М.', age: 8, text: 'Теперь я знаю все белые клавиши и могу играть "В лесу родилась ёлочка"!', stars: 5, avatar: '🎹' },
    { name: 'Максим К.', age: 10, text: 'Виртуальная клавиатура помогла мне выучить ноты быстрее, чем у учителя!', stars: 5, avatar: '🎹' },
    { name: 'София Л.', age: 9, text: 'Я уже играю двумя руками! Мама говорит, что я настоящая пианистка!', stars: 5, avatar: '🎹' },
  ];

  const handleQuizStart = (levelId: number) => {
    setSelectedLevel(levelId);
  };

  if (showLearning && isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎹</div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ПианоНоты
              </h1>
            </div>
            <Button onClick={() => setShowLearning(false)} variant="outline">
              <Icon name="Home" className="mr-2" size={16} />
              Главная
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <UserProfile user={userData} />
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="piano" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="piano" className="flex items-center gap-2">
                    <Icon name="Piano" size={16} />
                    Клавиатура
                  </TabsTrigger>
                  <TabsTrigger value="theory" className="flex items-center gap-2">
                    <Icon name="BookOpen" size={16} />
                    Теория
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="flex items-center gap-2">
                    <Icon name="Gamepad2" size={16} />
                    Практика
                  </TabsTrigger>
                  <TabsTrigger value="feedback" className="flex items-center gap-2">
                    <Icon name="BarChart3" size={16} />
                    Результаты
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="piano">
                  <VirtualPiano mode="practice" onNotePlay={(note) => console.log('Played:', note)} />
                </TabsContent>

                <TabsContent value="theory">
                  <TheoryLesson 
                    lesson={theoryLesson} 
                    onComplete={() => {}} 
                  />
                </TabsContent>

                <TabsContent value="practice">
                  <PracticeExercise 
                    exercise={practiceQuestions[currentQuestion]} 
                    onAnswer={handleAnswer}
                  />
                </TabsContent>

                <TabsContent value="feedback">
                  <FeedbackSystem stats={stats} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🎹</div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ПианоНоты
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#home" className="text-foreground/80 hover:text-primary transition-colors font-medium">Главная</a>
            <a href="#levels" className="text-foreground/80 hover:text-primary transition-colors font-medium">Уровни</a>
            <a href="#reviews" className="text-foreground/80 hover:text-primary transition-colors font-medium">Отзывы</a>
          </nav>
          {!isLoggedIn ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg">
                  Начать обучение
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Регистрация</DialogTitle>
                  <DialogDescription>
                    Создай аккаунт и начни учиться играть на фортепиано!
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Как тебя зовут?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Возраст</Label>
                    <Input id="age" type="number" placeholder="Сколько тебе лет?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email родителя</Label>
                    <Input id="email" type="email" placeholder="parent@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input id="password" type="password" placeholder="Придумай надёжный пароль" />
                  </div>
                  <Button onClick={handleLogin} className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg py-6">
                    🎉 Создать аккаунт
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button onClick={() => setShowLearning(true)} size="lg" className="bg-primary hover:bg-primary/90 shadow-lg">
              <Icon name="BookOpen" className="mr-2" size={16} />
              Продолжить обучение
            </Button>
          )}
        </div>
      </header>

      <section id="home" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-4 py-2">
                🏆 Более 10,000 учеников уже с нами!
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Учись играть на <span className="text-primary">фортепиано!</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Превращаем обучение нотной грамоте для фортепиано в увлекательную игру! 
                Интерактивные викторины с виртуальной клавиатурой, упражнения для пальцев 
                и изучение нот на клавишах.
              </p>
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg text-lg px-8 py-6">
                      <Icon name="Rocket" className="mr-2" size={20} />
                      Начать бесплатно
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Регистрация</DialogTitle>
                      <DialogDescription>
                        Создай аккаунт и начни своё музыкальное путешествие!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name2">Имя</Label>
                        <Input id="name2" placeholder="Как тебя зовут?" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age2">Возраст</Label>
                        <Input id="age2" type="number" placeholder="Сколько тебе лет?" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email2">Email родителя</Label>
                        <Input id="email2" type="email" placeholder="parent@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password2">Пароль</Label>
                        <Input id="password2" type="password" placeholder="Придумай надёжный пароль" />
                      </div>
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg py-6">
                        🎉 Создать аккаунт
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2">
                  <Icon name="Play" className="mr-2" size={20} />
                  Смотреть демо
                </Button>
              </div>
              <div className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Твой прогресс</span>
                  <span className="text-sm font-bold text-primary">{userProgress}%</span>
                </div>
                <Progress value={userProgress} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">Продолжай в том же духе! 🎯</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-4">
                  {['🎹', '🎼', '🎵', '⬜', '⬛', '🎶', '👆', '✋', '🏆'].map((emoji, i) => (
                    <div 
                      key={i} 
                      className="aspect-square bg-white rounded-2xl flex items-center justify-center text-4xl hover-scale cursor-pointer shadow-md animate-float"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="levels" className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-secondary text-white hover:bg-secondary/90 text-base px-4 py-2 mb-4">
              Выбери свой уровень
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Уровни сложности</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              От простого к сложному! Проходи уровни, зарабатывай звёзды и открывай новые задания
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => (
              <Card 
                key={level.id} 
                className={`relative overflow-hidden hover-scale transition-all ${level.locked ? 'opacity-60' : 'cursor-pointer'} border-2 hover:border-primary/50`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-3xl mb-4">
                      <Icon name={level.icon as any} size={32} className="text-white" />
                    </div>
                    {level.locked && (
                      <Icon name="Lock" size={24} className="text-muted-foreground" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{level.title}</CardTitle>
                  <CardDescription>{level.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-sm">
                        {level.difficulty}
                      </Badge>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((star) => (
                          <Icon 
                            key={star} 
                            name="Star" 
                            size={20} 
                            className={star <= level.stars ? 'text-accent fill-accent' : 'text-gray-300'} 
                          />
                        ))}
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-secondary hover:bg-secondary/90 text-white"
                          disabled={level.locked}
                          onClick={() => handleQuizStart(level.id)}
                        >
                          {level.locked ? (
                            <>
                              <Icon name="Lock" className="mr-2" size={16} />
                              Заблокировано
                            </>
                          ) : (
                            <>
                              <Icon name="Play" className="mr-2" size={16} />
                              Начать урок
                            </>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{level.title}</DialogTitle>
                          <DialogDescription>
                            Интерактивная викторина и тренажёр
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
                            <div className="text-6xl mb-4">🎵</div>
                            <h3 className="text-xl font-bold mb-2">Готов начать?</h3>
                            <p className="text-muted-foreground mb-4">
                              В этом уроке тебя ждёт {Math.floor(Math.random() * 10) + 5} заданий
                            </p>
                            <div className="flex gap-4 justify-center">
                              <Button className="bg-primary hover:bg-primary/90">
                                <Icon name="Zap" className="mr-2" size={16} />
                                Начать викторину
                              </Button>
                              <Button variant="outline">
                                <Icon name="BookOpen" className="mr-2" size={16} />
                                Теория
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <Card className="text-center p-4">
                              <div className="text-2xl mb-2">🎯</div>
                              <p className="text-xs text-muted-foreground">Викторины</p>
                            </Card>
                            <Card className="text-center p-4">
                              <div className="text-2xl mb-2">🎮</div>
                              <p className="text-xs text-muted-foreground">Тренажёры</p>
                            </Card>
                            <Card className="text-center p-4">
                              <div className="text-2xl mb-2">🔬</div>
                              <p className="text-xs text-muted-foreground">Лаборатория</p>
                            </Card>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-4 py-2 mb-4">
              Что говорят ученики
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Тысячи детей уже научились читать ноты с помощью нашей платформы
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="hover-scale border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl">
                      {review.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.age} лет</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon 
                        key={star} 
                        name="Star" 
                        size={16} 
                        className={star <= review.stars ? 'text-accent fill-accent' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Готов научиться играть на пианино?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Присоединяйся к тысячам учеников, которые уже играют свои первые мелодии на фортепиано!
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 shadow-xl">
                <Icon name="Sparkles" className="mr-2" size={20} />
                Начать бесплатно прямо сейчас
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Регистрация</DialogTitle>
                <DialogDescription>
                  Создай аккаунт и начни учиться играть на фортепиано!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name3">Имя</Label>
                  <Input id="name3" placeholder="Как тебя зовут?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age3">Возраст</Label>
                  <Input id="age3" type="number" placeholder="Сколько тебе лет?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email3">Email родителя</Label>
                  <Input id="email3" type="email" placeholder="parent@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password3">Пароль</Label>
                  <Input id="password3" type="password" placeholder="Придумай надёжный пароль" />
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg py-6">
                  🎉 Создать аккаунт
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">🎹</div>
                <h3 className="text-xl font-bold">ПианоНоты</h3>
              </div>
              <p className="text-gray-400">Обучение игре на фортепиано через игру</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Главная</a></li>
                <li><a href="#levels" className="hover:text-white transition-colors">Уровни</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Отзывы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Следите за нами</h4>
              <div className="flex gap-4">
                <Icon name="Facebook" className="hover-scale cursor-pointer" size={24} />
                <Icon name="Twitter" className="hover-scale cursor-pointer" size={24} />
                <Icon name="Instagram" className="hover-scale cursor-pointer" size={24} />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 НотаМастер. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
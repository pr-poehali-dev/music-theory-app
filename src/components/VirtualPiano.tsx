import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Note {
  name: string;
  isBlack: boolean;
  sound: string;
}

interface VirtualPianoProps {
  mode?: 'practice' | 'quiz';
  targetNote?: string;
  onNotePlay?: (note: string) => void;
}

interface RecordedNote {
  sound: string;
  name: string;
  timestamp: number;
}

const VirtualPiano = ({ mode = 'practice', targetNote, onNotePlay }: VirtualPianoProps) => {
  const [playedNote, setPlayedNote] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedMelody, setRecordedMelody] = useState<RecordedNote[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState<number>(0);

  const whiteNotes: Note[] = [
    { name: 'До', isBlack: false, sound: 'C' },
    { name: 'Ре', isBlack: false, sound: 'D' },
    { name: 'Ми', isBlack: false, sound: 'E' },
    { name: 'Фа', isBlack: false, sound: 'F' },
    { name: 'Соль', isBlack: false, sound: 'G' },
    { name: 'Ля', isBlack: false, sound: 'A' },
    { name: 'Си', isBlack: false, sound: 'B' },
  ];

  const blackNotes: (Note | null)[] = [
    { name: 'До#', isBlack: true, sound: 'C#' },
    { name: 'Ре#', isBlack: true, sound: 'D#' },
    null,
    { name: 'Фа#', isBlack: true, sound: 'F#' },
    { name: 'Соль#', isBlack: true, sound: 'G#' },
    { name: 'Ля#', isBlack: true, sound: 'A#' },
    null,
  ];

  const playSound = (sound: string) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    const noteFrequencies: { [key: string]: number } = {
      'C': 261.63,
      'C#': 277.18,
      'D': 293.66,
      'D#': 311.13,
      'E': 329.63,
      'F': 349.23,
      'F#': 369.99,
      'G': 392.00,
      'G#': 415.30,
      'A': 440.00,
      'A#': 466.16,
      'B': 493.88,
    };

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = noteFrequencies[sound] || 440;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handleNoteClick = (note: Note) => {
    setPlayedNote(note.name);
    playSound(note.sound);
    
    if (isRecording) {
      const timestamp = Date.now() - recordingStartTime;
      setRecordedMelody(prev => [...prev, { sound: note.sound, name: note.name, timestamp }]);
    }
    
    if (mode === 'quiz' && targetNote) {
      const isCorrect = note.name === targetNote;
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      onNotePlay?.(note.name);
    } else {
      onNotePlay?.(note.name);
    }

    setTimeout(() => setPlayedNote(null), 300);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordedMelody([]);
    setRecordingStartTime(Date.now());
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const playMelody = async () => {
    if (recordedMelody.length === 0 || isPlaying) return;
    
    setIsPlaying(true);
    
    for (let i = 0; i < recordedMelody.length; i++) {
      const note = recordedMelody[i];
      const nextNote = recordedMelody[i + 1];
      
      setPlayedNote(note.name);
      playSound(note.sound);
      
      const delay = nextNote ? nextNote.timestamp - note.timestamp : 300;
      await new Promise(resolve => setTimeout(resolve, Math.max(delay, 100)));
      setPlayedNote(null);
    }
    
    setIsPlaying(false);
  };

  const clearMelody = () => {
    setRecordedMelody([]);
    setIsRecording(false);
  };

  return (
    <Card className="border-2">
      <CardHeader className="bg-gradient-to-r from-red-50 to-yellow-50">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl mb-2 flex items-center gap-2">
              <Icon name="Piano" size={28} className="text-primary" />
              Виртуальная клавиатура
            </CardTitle>
            <CardDescription>
              {mode === 'quiz' 
                ? `Найди и нажми ноту: ${targetNote}` 
                : 'Нажимай на клавиши, чтобы услышать ноты'}
            </CardDescription>
          </div>
          {mode === 'quiz' && (
            <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
              Счёт: {score}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl">
          <div className="relative inline-flex">
            <div className="flex gap-1">
              {whiteNotes.map((note, index) => {
                const isTarget = mode === 'quiz' && note.name === targetNote;
                const isPlayed = playedNote === note.name;
                
                return (
                  <div key={index} className="relative">
                    <Button
                      onClick={() => handleNoteClick(note)}
                      className={`
                        w-16 h-48 rounded-b-lg border-4 border-gray-700 
                        transition-all duration-150 shadow-lg
                        flex flex-col items-center justify-end pb-4
                        ${isPlayed 
                          ? 'bg-primary text-white scale-95' 
                          : isTarget
                          ? 'bg-yellow-100 hover:bg-yellow-200 animate-pulse'
                          : 'bg-white hover:bg-gray-100'
                        }
                      `}
                      style={{ 
                        transform: isPlayed ? 'translateY(4px)' : 'translateY(0)',
                      }}
                    >
                      <span className={`text-sm font-bold ${isPlayed ? 'text-white' : 'text-gray-700'}`}>
                        {note.name}
                      </span>
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="absolute top-0 left-0 flex gap-1 pointer-events-none">
              {blackNotes.map((note, index) => (
                <div key={index} className="relative w-16 pointer-events-auto">
                  {note && (
                    <Button
                      onClick={() => handleNoteClick(note)}
                      className={`
                        absolute left-10 w-10 h-32 rounded-b-lg border-2 border-gray-900
                        transition-all duration-150 shadow-xl z-10
                        flex flex-col items-center justify-end pb-3
                        ${playedNote === note.name
                          ? 'bg-secondary text-white scale-95'
                          : mode === 'quiz' && note.name === targetNote
                          ? 'bg-blue-300 hover:bg-blue-400 animate-pulse'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                        }
                      `}
                      style={{ 
                        transform: playedNote === note.name ? 'translateY(3px)' : 'translateY(0)',
                      }}
                    >
                      <span className="text-xs font-bold">{note.name}</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm">
                {playedNote ? `Играет: ${playedNote}` : 'Нажми на клавишу'}
              </span>
            </div>

            {mode === 'practice' && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    variant="default"
                    className="bg-red-600 hover:bg-red-700 text-white gap-2"
                  >
                    <Icon name="Circle" size={16} className="fill-current" />
                    Записать мелодию
                  </Button>
                ) : (
                  <Button
                    onClick={stopRecording}
                    variant="default"
                    className="bg-red-600 hover:bg-red-700 text-white gap-2 animate-pulse"
                  >
                    <Icon name="Square" size={16} className="fill-current" />
                    Остановить запись
                  </Button>
                )}

                {recordedMelody.length > 0 && (
                  <>
                    <Button
                      onClick={playMelody}
                      disabled={isPlaying}
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    >
                      <Icon name={isPlaying ? "Loader2" : "Play"} size={16} className={isPlaying ? "animate-spin" : ""} />
                      {isPlaying ? 'Воспроизведение...' : 'Воспроизвести'}
                    </Button>

                    <Button
                      onClick={clearMelody}
                      disabled={isPlaying || isRecording}
                      variant="outline"
                      className="bg-white/10 text-white hover:bg-white/20 border-white/30 gap-2"
                    >
                      <Icon name="Trash2" size={16} />
                      Очистить
                    </Button>

                    <Badge className="bg-yellow-500 text-black px-3 py-1">
                      {recordedMelody.length} {recordedMelody.length === 1 ? 'нота' : 'ноты'}
                    </Badge>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {mode === 'practice' && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-white rounded border-2 border-gray-700"></div>
                <span className="font-semibold text-sm">Белые клавиши</span>
              </div>
              <p className="text-xs text-muted-foreground">Основные ноты</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gray-900 rounded border-2 border-gray-900"></div>
                <span className="font-semibold text-sm">Чёрные клавиши</span>
              </div>
              <p className="text-xs text-muted-foreground">Полутоны (диез)</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VirtualPiano;
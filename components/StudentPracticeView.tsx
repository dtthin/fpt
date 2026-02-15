import React, { useState, useEffect } from 'react';
import { ProcessedQuestion, VietProblemType, GradingResult, VoiceMathResult } from '../types';
import { gradingEngine } from '../services/gradingEngine';
import GradingFeedback from './GradingFeedback';
import VoiceInput from './VoiceInput';

// MOCK DATA for demonstration (In real app, this comes from Adaptive Engine)
const MOCK_QUESTION: ProcessedQuestion = {
  id: "mock_1",
  raw_text: "...",
  cleaned_content: "Cho phương trình x^2 - 7x + 12 = 0. Không giải phương trình, hãy tính giá trị biểu thức A = x1^2 + x2^2.",
  detected_equation: "x^2 - 7x + 12 = 0",
  sub_topic: VietProblemType.SYMMETRIC_EXPRESSION,
  difficulty_score: 0.4,
  difficulty_level: 'MEDIUM',
  has_parameter: false,
  is_multi_step: true,
  estimated_time_seconds: 300,
  is_valid_viet: true,
  status: 'PUBLISHED',
  created_at: Date.now(),
  source_file: "De_thi_HK1.pdf"
};

interface StudentPracticeViewProps {
  onBack: () => void;
}

const StudentPracticeView: React.FC<StudentPracticeViewProps> = ({ onBack }) => {
  const [question, setQuestion] = useState<ProcessedQuestion>(MOCK_QUESTION);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);
  
  // Voice State
  const [voiceResult, setVoiceResult] = useState<VoiceMathResult | null>(null);

  const handleSubmit = async () => {
    if (!studentAnswer.trim()) return;

    setIsGrading(true);
    try {
      const result = await gradingEngine.gradeSubmission(
        question.cleaned_content,
        studentAnswer,
        question.solution
      );
      setGradingResult(result);
    } catch (error) {
      alert("Có lỗi khi chấm bài. Vui lòng thử lại.");
    } finally {
      setIsGrading(false);
    }
  };

  const handleNextQuestion = () => {
    setStudentAnswer("");
    setGradingResult(null);
    setVoiceResult(null);
    alert("Hệ thống sẽ tải câu hỏi tiếp theo dựa trên Adaptive Engine (Mock).");
  };

  const handleVoiceResult = (result: VoiceMathResult) => {
    setVoiceResult(result);
    if (result.is_correct_syntax) {
      // Append formatted math to text area
      const mathLine = result.calculated_result 
        ? `${result.latex_expression} = ${result.calculated_result}` 
        : result.latex_expression;
      
      setStudentAnswer(prev => prev + (prev ? "\n" : "") + mathLine);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface animate-fade-in-up">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="font-medium text-sm">Thoát</span>
        </button>
        
        <div className="flex flex-col items-center">
           <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Luyện tập thích ứng</span>
           <span className="text-sm font-semibold text-primary-600">{question.sub_topic}</span>
        </div>

        <div className="w-20"></div> {/* Spacer for center alignment */}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: Question Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-card border border-neutral-100 sticky top-4">
              <div className="flex items-center gap-3 mb-6">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-600`}>
                    {question.difficulty_level}
                 </span>
              </div>
              
              <div className="math-content text-xl text-neutral-800 leading-loose">
                {question.cleaned_content}
              </div>

              {question.detected_equation && (
                 <div className="mt-8 p-4 bg-pastel-blue rounded-xl flex items-center justify-center">
                    <code className="text-lg font-serif font-bold text-primary-800">
                      {question.detected_equation}
                    </code>
                 </div>
              )}
            </div>
          </div>

          {/* RIGHT: Answer Column */}
          <div className="space-y-6 flex flex-col">
            
            {/* Input Area */}
            {!gradingResult && (
              <div className="bg-white rounded-2xl p-1 shadow-card border border-neutral-200 flex-1 flex flex-col min-h-[500px] relative">
                
                {/* Voice Result Overlay (Transient) */}
                {voiceResult && (
                  <div className="mx-4 mt-4 p-3 bg-neutral-900 text-white rounded-xl shadow-lg flex flex-col gap-1 animate-fade-in-up">
                    <div className="flex justify-between items-start">
                       <span className="text-xs text-neutral-400 uppercase font-bold">AI nghe được:</span>
                       <button onClick={() => setVoiceResult(null)} className="text-neutral-500 hover:text-white">&times;</button>
                    </div>
                    <p className="italic text-neutral-300 text-sm">"{voiceResult.transcript}"</p>
                    
                    <div className="mt-2 pt-2 border-t border-neutral-700">
                       <div className="flex items-center gap-2">
                          <span className="text-green-400 font-serif font-bold text-lg">{voiceResult.latex_expression}</span>
                          {voiceResult.calculated_result && (
                            <>
                              <span className="text-neutral-500">=</span>
                              <span className="bg-green-500 text-black px-2 py-0.5 rounded font-bold">{voiceResult.calculated_result}</span>
                            </>
                          )}
                       </div>
                       <p className="text-xs text-neutral-400 mt-1">{voiceResult.feedback}</p>
                    </div>
                  </div>
                )}

                <div className="bg-neutral-50 px-4 py-2 rounded-t-xl border-b border-neutral-100 flex justify-between items-center mt-1">
                   <span className="text-xs font-semibold text-neutral-500 uppercase">Lời giải của bạn</span>
                   <span className="text-xs text-neutral-400 italic">Hỗ trợ nhập liệu cơ bản</span>
                </div>
                
                <textarea
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="Nhập lời giải hoặc sử dụng giọng nói..."
                  className="w-full h-full flex-1 p-6 resize-none focus:outline-none text-base text-neutral-800 font-serif leading-relaxed"
                  disabled={isGrading}
                />
                
                {/* Action Bar */}
                <div className="p-4 border-t border-neutral-100 bg-white rounded-b-xl flex justify-between items-center">
                   
                   {/* Voice Button */}
                   <VoiceInput 
                     onResult={handleVoiceResult} 
                     onProcessingStart={() => setVoiceResult(null)}
                     disabled={isGrading}
                   />

                   <button
                     onClick={handleSubmit}
                     disabled={!studentAnswer.trim() || isGrading}
                     className={`
                       px-8 py-3 rounded-xl font-bold shadow-lg transition-all transform active:scale-95 h-12
                       ${!studentAnswer.trim() || isGrading 
                         ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none' 
                         : 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-xl'}
                     `}
                   >
                     {isGrading ? 'AI Đang chấm...' : 'Nộp bài'}
                   </button>
                </div>
              </div>
            )}

            {/* Feedback Area */}
            {gradingResult && (
              <GradingFeedback 
                result={gradingResult}
                onNext={handleNextQuestion}
                onRetry={() => setGradingResult(null)}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentPracticeView;
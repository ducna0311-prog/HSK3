

/* --- BƯỚC 2: LẤY CÁC THÀNH PHẦN HTML --- */
const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-btn');
const resultsContainer = document.getElementById('results-container');

/* --- BƯỚC 3: HÀM XÁO TRỘN MẢNG (FISHER-YATES) --- */
// Hàm này dùng để xáo trộn cả câu hỏi VÀ câu trả lời
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* --- BƯỚC 4: HÀM HIỂN THỊ CÂU HỎI (ĐÃ CẬP NHẬT) --- */
// Hàm này sẽ xáo trộn các câu trả lời (A, B, C, D)
function displayQuiz() {
    let output = [];
    const letters = ['A', 'B', 'C', 'D']; // Gán nhãn
    
    quizData.forEach((currentQuestion, questionIndex) => {
        let optionsOutput = [];

        // Xáo trộn mảng câu trả lời của câu hỏi hiện tại
        shuffleArray(currentQuestion.answers);

        // Lặp qua từng câu trả lời (đã xáo trộn)
        currentQuestion.answers.forEach((answer, answerIndex) => {
            optionsOutput.push(
                `<label class="option">
                    <input type="radio" name="question${questionIndex}" value="${answer.correct}">
                    ${letters[answerIndex]}: ${answer.text}
                </label>`
            );
        });

        // Thêm câu hỏi và các lựa chọn vào mảng output
        output.push(
            `<div class="question-block">
                <div class="question-text">${questionIndex + 1}. ${currentQuestion.question}</div>
                <div class="options">
                    ${optionsOutput.join('')}
                </div>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

/* --- BƯỚC 5: HÀM CHẤM ĐIỂM (ĐÃ CẬP NHẬT) --- */
// Hàm này chấm điểm và tô màu đúng/sai
function showResults() {
    let score = 0;
    const allQuestionBlocks = document.querySelectorAll('.question-block');

    quizData.forEach((currentQuestion, questionIndex) => {
        
        const selector = `input[name="question${questionIndex}"]:checked`;
        const userInputElement = document.querySelector(selector);
        const userAnswerValue = (userInputElement || {}).value; // Sẽ là "true" hoặc "false"

        // 1. Tính điểm
        if (userAnswerValue === "true") {
            score++;
        }

        // 2. Tô màu Đúng/Sai
        const inputs = allQuestionBlocks[questionIndex].querySelectorAll('input[type="radio"]');

        inputs.forEach(input => {
            const optionValue = input.value; // "true" hoặc "false"
            const optionLabel = input.parentElement; 

            input.disabled = true; // Vô hiệu hóa

            if (optionValue === "true") {
                optionLabel.classList.add('correct'); // Luôn tô xanh đáp án đúng
            } 
            else if (input.checked && optionValue === "false") {
                optionLabel.classList.add('incorrect'); // Tô đỏ cái bị chọn sai
            }
        });
    });

    // 3. Hiển thị kết quả
    resultsContainer.innerHTML = `Bạn đã trả lời đúng ${score} / ${quizData.length} câu!`;
    
    // 4. Vô hiệu hóa nút nộp bài
    submitButton.disabled = true;
    submitButton.style.backgroundColor = '#aaa';
}

/* --- BƯỚC 6: KHỞI TẠO VÀ GẮN SỰ KIỆN --- */

// Xáo trộn thứ tự CÂU HỎI
shuffleArray(quizData); 

// Hiển thị quiz lên trang
displayQuiz();

// Gắn sự kiện 'click' cho nút "Nộp bài"
submitButton.addEventListener('click', showResults);
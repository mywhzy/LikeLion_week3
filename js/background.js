const images = ["0.jpeg", "1.jpeg", "2.jpeg"];


// chosenImage에 이미지를 랜덤 선언
const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

//[quiz] 'append()' vs 'appendChild()' 둘 다 시도해보기 
//append: 여러 자식 요소 설정 가능 but 리턴값 반환X appendChild:오직 하나의 노드만 추가 가능 리턴값 반환O
document.body.append(bgImage);

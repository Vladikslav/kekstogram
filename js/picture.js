window.onload = () => {
    var array = [];
    for (let i = 1; i <= 26; i++) {
        const user = {
            'url': "../photos/" + i + ".jpg",
            'likes': getRandomLike(),
            //'comments': getRandomComment(),
            'description': getRandomDescription()
        }
        array.push(user);
    }
    function getRandomLike() {
        return Math.floor(Math.random() * (200 - 15)) + 15;

    }
    function getRandomComment() {
        var arrayComment = ['Все отлично!', 'В целом все неплохо. Но не все.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
            'Моя бабушка слуйчайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
            'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
        var arrays = [];
        var i = 0;
        while (i < 2) {
            const element = Math.floor(Math.random() * arrayComment.length);
            arrays.push(arrayComment[element]);
            i++;
        }
        return arrays;
    }
    function getRandomDescription() {
        var arrayDescription = ['Тестим новую камеру!', "Затусили с друзьями на море", "Как же круто тут кормят", "Отдыхаем...",
            "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами...", "Вот это тачка!"];
        const element = Math.floor(Math.random() * arrayDescription.length);
        return arrayDescription[element];
    }
    function getcountRandom() {
        return Math.floor(Math.random() * 3) + 1;
    }
    function getcountComment() {
        return Math.floor(Math.random() * 1000) + 1;
    }
    function openPopup() {
        document.querySelector('.upload-overlay').classList.remove('hidden');
        document.removeEventListener('click', onPopupMouseClick);
    }
    function closePopup() {
        document.querySelector('.upload-overlay').classList.add('hidden');
        document.removeEventListener('click', closePopupMouseClick);
        document.removeEventListener('keydown', onPopupEscKeyDown);
    }
    function onPlusResizeImage () {
        let value = document.querySelector('.upload-resize-controls-value').value;
        let int = +value.substr(0,value.length-1);
        if( int > 25) {
            int -= 25;
            int = int + "%";
            document.querySelector('.upload-resize-controls-value').value = int;
        }
    } 
    let similatPicture = document.querySelector('#picture-template').content.querySelector('.picture')
    let fragment = document.createDocumentFragment();
    let pictures = document.querySelector('.pictures');
    for (let j = 0; j < array.length; j++) {
        const element = similatPicture.cloneNode(true);
        fragment.appendChild(element);
        let img = element.querySelector('img');
        let statLikes = element.querySelector('.picture-likes');
        let statComments = element.querySelector('.picture-comments');
        img.setAttribute('src', array[j]['url']);
        statLikes.textContent = array[j]['likes'];
        statComments.textContent = getcountComment();
        fragment.appendChild(element);
    }
    pictures.appendChild(fragment);


    // document.querySelector(".gallery-overlay").classList.remove('hidden');
    // let galleryImage = document.querySelector('.gallery-overlay-image');
    // galleryImage.setAttribute('src', '../img/logo-background-' + getcountRandom() + '.jpg');
    // document.querySelector('.comments-count').textContent = getcountComment();
    // document.querySelector('.likes-count').textContent = getRandomLike();
    // let commentBigFoto = getRandomComment();
    // for (const iterator of commentBigFoto) {
    //     let p = document.createElement('p');//textContent = iterator;
    //     p.classList.add('social__comments');
    //     p.textContent = iterator;
    //     document.querySelector('.gallery-overlay-controls').appendChild(p);
    // }  
    let onPopupMouseClick = document.querySelector('#upload-file').addEventListener('change', function () {
        openPopup();
    });
    let closePopupMouseClick = document.querySelector('#upload-cancel').addEventListener('click', function () {
        if (!document.querySelector('.upload-overlay').classList.contains('hidden')) {
            document.getElementById("upload-file").value = "";
            closePopup();
        }
    });
    let onPopupEscKeyDown = document.querySelector('#upload-cancel').addEventListener('keydown', function (evt) {
        if (!document.querySelector('.upload-overlay').classList.contains('hidden')) {
            if (evt.keyCode == 27) {
                document.getElementById("upload-file").value = "";
                closePopup();
            }
        }
    });
    let descResize = document.querySelector('.upload-resize-controls-button-dec').addEventListener('click',function() {
        onPlusResizeImage();
    });
}
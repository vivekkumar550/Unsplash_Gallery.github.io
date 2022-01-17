const ACCESS_KEY = "ksZsBttoiQtqzZMEm6sG_GGm01Ic-dcqGc47OGGVN5c";
const SECRET_KEY = "sRvH4n_yFPQI0HuLRQ_8qz_gRcq4dQ12mJAB1qX-LEk";
const BASE_URL = "https://api.unsplash.com";


(() => {
    let images = [];

    const search = async (search_query) => {
        try {
            const fetch_config = {
                headers: {
                    Authorization: `Client-ID ${ACCESS_KEY}`,
                }
            };
            const res = await fetch(`${BASE_URL}/search/photos?query=${search_query}`, fetch_config);
            images = await res.json();
            images = images.results;
            disp();

        } catch (e) {
            console.log(e);
            console.log("Something is wrong in the search")
        }
    }

    (async () => {
        try {
            const current_location = window.location.href;
            const url_obj = new URL(current_location);
            const search_query = url_obj.searchParams.get("search_query");
            if (search_query == null || search_query == "") {
                const res = await fetch(`${BASE_URL}/photos/?client_id=${ACCESS_KEY}`);
                images = await res.json();
                disp();
            } else {
                search(search_query);
            }
        } catch (e) {
            console.log("Something messed up");
        }
    })();


    const disp = () => {
        // console.log(images);
        const container = document.getElementById('container');
        container.innerHTML = "";
        images.forEach((elem) => {
            const img_loc = elem.links.download;
            // console.log(elem);


            const img_box = document.createElement('div');
            const img = document.createElement('img');
            img.src = img_loc;
            img_box.appendChild(img);

            container.appendChild(img_box);
        });
    }

})();

const random_images = function () {
    var lower = 0;
    var upper = 100000000;

    for (i = 0; i < 10; i++) {

        const container = document.getElementById("container");
        const img_loc = "https://picsum.photos/500/300?random=" + (Math.floor(Math.random() * (upper - lower)) + lower);
        console.log(img_loc);
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = img_loc;
        div.appendChild(img);
        container.appendChild(div);





    }



}

const body = document.getElementsByTagName("body")[0];
window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        random_images();

    }
};

// const data = [
//   {
//     name: "Surya Eldianto",
//     massage: "Keren banget jasanya",
//     image: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     rating: 5,
//   },
//   {
//     name: "Surya Els",
//     massage: "Keren lah pokoknya",
//     image: "assets/img/christian-buehner-DItYlc26zVI-unsplash.jpg",
//     rating: 4,
//   },
//   {
//     name: "Surya Gans",
//     massage: "The best pelayannya",
//     image: "assets/img/irene-strong-v2aKnjMbP_k-unsplash.jpg",
//     rating: 5,
//   },
//   {
//     name: "Suryaaaa",
//     massage: "Oke lah",
//     image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     rating: 2,
//   },
//   {
//     name: "Suryeah",
//     massage: "Apa apaan ini",
//     image: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     rating: 3,
//   },
// ];

// console.log("System start");

// function Stop() {
//   console.log("System stop")
// }

// for(let index = 0; index < 5; index++) {
//   ProcessB(index, () => {
//     if(index === 4) {
//       Stop()
//     }
//   })
// }

// function ProcessB(iterasi, callback) {
//   setTimeout(() => {
//     console.log("Process" + iterasi);
//     callback()
//   }, 3000)
// }

const getData = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.npoint.io/485228b0569e23c1317a");

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.response);
        resolve(data.data);
        console.log(data);
      } else {
        reject("error loading data");
      }
    };
    xhr.onerror = () => reject("Network Error");

    xhr.send();
  });
};

const runData = async () => {
  try {
    const response = await getData();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

runData();

async function renderThis(dataItem) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataHTML = `
        <div class="card-testi" style="width:30%;">
            <img src="${dataItem.image}" style="height: 50%; width: 100%;" alt="" /><br />
            <h2 class="user-testi">${dataItem.comment}</h2>
            <h4 class="user">- ${dataItem.author}</h4>
            <h5 class="rating">${dataItem.rate}<i class="fa-solid fa-star"></i></h5>
        </div>`;

      document.getElementById("testimonial").innerHTML += dataHTML;
      resolve();
    }, 1000);
  });
}

async function allTesti() {
  document.getElementById("testimonial").innerHTML = "";
  let data = await getData();
  for (let i = 0; i < data.length; i++) {
    await renderThis(data[i]);
  }
}

allTesti();

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        reject(new Error(`Error loading data from ${url}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error"));
    };

    xhr.send();
  });
};

const getRateArray = async (url) => {
  try {
    const data = await fetchData(url);

    if (!data || !Array.isArray(data.data)) {
      throw new Error("Invalid data format");
    }

    const rateArray = data.data.map((item) => item.rate);

    return rateArray;
  } catch (error) {
    throw error;
  }
};

const FilterTesti = async (targetRating) => {
  try {
    const apiUrl = "https://api.npoint.io/485228b0569e23c1317a";
    const rateArray = await getRateArray(apiUrl);

    let dataHTML = "";

    const dataFiltered = rateArray.filter((rating) => rating === targetRating);

    if (!dataFiltered.length) {
      dataHTML += `<h1>Data not found!!</h1>`;
    } else {
      const data = await fetchData(apiUrl);

      dataFiltered.forEach((rating) => {
        const item = data.data.find((testimonial) => testimonial.rate === rating);
        // comment double gak akan dimasukkin ke dalam pakai include
        if (item && !dataHTML.includes(item.comment)) {
          console.log(item);
          dataHTML += `
            <div class="card-testi">
              <img src="${item.image}" style="height: 55%; width: 100%;" alt="" /><br />
              <h2 class="user-testi">${item.comment}</h2>
              <h4 class="user">- ${item.author}</h4>
              <h5 class="rating">${item.rate}<i class="fa-solid fa-star"></i></h5>
            </div>
          `;
        }
      });
    }

    document.getElementById("testimonial").innerHTML = dataHTML;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

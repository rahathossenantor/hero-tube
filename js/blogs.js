console.clear();
const blogs = [
    {
        imagePath: "https://media.licdn.com/dms/image/C4D12AQHBLjTsIHHnlA/article-cover_image-shrink_720_1280/0/1584033909099?e=2147483647&v=beta&t=Qa-2b7O1nCoZ6rEtt6kHg5vLz-BZje853hCvW9a1irs",
        title: "Scope & other differences between of var, let, and const",
        body: "var declarations are globally scoped or function scoped while let and const are block scoped. var variables can be updated and re-declared within its scope; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared. They are all hoisted to the top of their scope....",
        buttonText: "Continue reading &rarr;",
        id: 101
    },
    {
        imagePath: "https://miro.medium.com/v2/resize:fit:1358/1*LTQLSojGlJFJ1SI-LfDPpQ.jpeg",
        title: "Use cases of null and undefined in JavaScript",
        body: "Undefined means the variable has been declared, but its value has not been assigned. Null means an empty value or a blank value. The typeof() operator returns undefined for an undefined variable. The typeof() operator returns the type as an object for a variable whose value is assigned as null....",
        buttonText: "Continue reading &rarr;",
        id: 102
    },
    {
        imagePath: "https://nordicapis.com/wp-content/uploads/Is-REST-Still-a-Good-API-Design-Style-to-Use--e1617668480322-1024x576.jpg",
        title: "What is REST API (Application Programming Interface)?",
        body: "A REST API (also known as RESTful API) is an application programming interface (API or web API) that conforms to the constraints of REST architectural style and allows for interaction with RESTful web services. REST stands for representational state transfer and was created by computer scientist Roy Fielding....",
        buttonText: "Continue reading &rarr;",
        id: 103
    }
];

// render blogs
const renderBlogs = () => {
    const blogContainer = document.getElementById("blog-container");

    for (const blog of blogs) {
        const div = document.createElement("div");
        div.classList.add("border", "rounded-md", "shadow-xl");
        div.innerHTML = `
            <figure class="p-5 w-full">
                <div class="rounded-md flex items-center">
                    <img src="${blog.imagePath}" class="rounded-md inline-block w-full 2xl:h-60 xl:h-56 lg:h-60 md:h-48 h-48" alt="blog-image">
                </div>
            </figure>
            <div class="p-5 pt-0">
                <h4 class="text-2xl font-semibold">${blog.title}</h4>
                <p class="my-3">${blog.body}</p>
                <button id="purchase-btn" class="btn bg-[#003362] normal-case text-white hover:text-[#003362] w-full">${blog.buttonText}</button>
            </div>
        `;
        blogContainer.appendChild(div);
    }
}

renderBlogs();
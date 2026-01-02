// Portfolio projects data
const portfolioProjects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with real-time inventory management and payment processing.",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        link: "#"
    },
    {
        id: 2,
        title: "Task Management System",
        description: "Collaborative task management tool with real-time updates and team analytics.",
        tags: ["Vue.js", "Firebase", "TypeScript"],
        link: "#"
    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "Real-time weather monitoring dashboard with historical data visualization.",
        tags: ["Python", "Flask", "D3.js", "APIs"],
        link: "#"
    },
    {
        id: 4,
        title: "Social Media Analytics",
        description: "Analytics platform for tracking social media engagement and audience insights.",
        tags: ["Angular", "PostgreSQL", "Docker"],
        link: "#"
    },
    {
        id: 5,
        title: "Mobile Fitness App",
        description: "Cross-platform fitness tracking app with workout plans and nutrition tracking.",
        tags: ["React Native", "GraphQL", "AWS"],
        link: "#"
    },
    {
        id: 6,
        title: "AI Chatbot",
        description: "Intelligent chatbot with natural language processing for customer support.",
        tags: ["Python", "TensorFlow", "NLP", "FastAPI"],
        link: "#"
    }
];

// Photo gallery data
const galleryPhotos = [
    { id: 1, title: "Sunset Coding", placeholder: "🌅" },
    { id: 2, title: "Coffee & Code", placeholder: "☕" },
    { id: 3, title: "Workspace Setup", placeholder: "💻" },
    { id: 4, title: "Conference 2025", placeholder: "🎤" },
    { id: 5, title: "Team Hackathon", placeholder: "🚀" },
    { id: 6, title: "Code Review", placeholder: "📝" },
    { id: 7, title: "Mountain Retreat", placeholder: "🏔️" },
    { id: 8, title: "Tech Meetup", placeholder: "👥" },
    { id: 9, title: "Late Night Debug", placeholder: "🌙" }
];

// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Building Scalable Microservices with Node.js",
        date: "2025-12-15",
        excerpt: "Learn how to architect and deploy microservices that scale efficiently using Node.js and Docker containers...",
        content: `
            <h2>Introduction</h2>
            <p>Microservices architecture has become the de facto standard for building scalable applications. In this article, we'll explore how to build and deploy microservices using Node.js.</p>
            
            <h2>Why Microservices?</h2>
            <p>Microservices offer several advantages:</p>
            <ul>
                <li>Independent deployment and scaling</li>
                <li>Technology flexibility</li>
                <li>Better fault isolation</li>
                <li>Easier to understand and maintain</li>
            </ul>
            
            <h2>Setting Up Your First Service</h2>
            <p>Let's start by creating a simple user service:</p>
            <pre><code>const express = require('express');
const app = express();

app.get('/users/:id', async (req, res) => {
    const user = await getUserById(req.params.id);
    res.json(user);
});

app.listen(3000);</code></pre>
            
            <h2>Containerization with Docker</h2>
            <p>Docker makes it easy to package and deploy your microservices. Here's a simple Dockerfile:</p>
            <pre><code>FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]</code></pre>
            
            <h2>Conclusion</h2>
            <p>Microservices architecture requires careful planning but offers significant benefits for scalable applications. Start small, iterate, and scale as needed.</p>
        `
    },
    {
        id: 2,
        title: "CSS Grid vs Flexbox: When to Use Each",
        date: "2025-11-28",
        excerpt: "A comprehensive guide to understanding the differences between CSS Grid and Flexbox and when to use each layout system...",
        content: `
            <h2>Understanding the Fundamentals</h2>
            <p>Both CSS Grid and Flexbox are powerful layout systems, but they excel in different scenarios.</p>
            
            <h2>Flexbox: One-Dimensional Layouts</h2>
            <p>Flexbox is perfect for:</p>
            <ul>
                <li>Navigation bars</li>
                <li>Card layouts in a single row/column</li>
                <li>Centering content</li>
                <li>Distributing space between items</li>
            </ul>
            
            <pre><code>.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}</code></pre>
            
            <h2>CSS Grid: Two-Dimensional Layouts</h2>
            <p>CSS Grid shines when you need:</p>
            <ul>
                <li>Complex page layouts</li>
                <li>Magazine-style layouts</li>
                <li>Precise control over rows and columns</li>
            </ul>
            
            <pre><code>.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}</code></pre>
            
            <h2>Best Practices</h2>
            <p>Use Flexbox for component-level layouts and Grid for page-level layouts. You can even combine both!</p>
        `
    },
    {
        id: 3,
        title: "My Journey into Web Development",
        date: "2025-10-10",
        excerpt: "Reflecting on my path from beginner to professional software engineer and the lessons learned along the way...",
        content: `
            <h2>The Beginning</h2>
            <p>Like many developers, my journey started with curiosity and a simple "Hello World" program. Little did I know where this path would lead.</p>
            
            <h2>Early Challenges</h2>
            <p>The learning curve was steep. Some of the biggest challenges I faced:</p>
            <ul>
                <li>Understanding asynchronous programming</li>
                <li>Debugging complex issues</li>
                <li>Learning to read documentation</li>
                <li>Overcoming impostor syndrome</li>
            </ul>
            
            <h2>Key Turning Points</h2>
            <p>Several moments changed my trajectory:</p>
            <ul>
                <li>Contributing to my first open source project</li>
                <li>Landing my first professional role</li>
                <li>Mentoring junior developers</li>
                <li>Speaking at my first tech conference</li>
            </ul>
            
            <h2>Advice for Beginners</h2>
            <p>If I could give advice to my past self:</p>
            <ul>
                <li>Build projects, not just tutorials</li>
                <li>Don't be afraid to ask questions</li>
                <li>Contribute to the community</li>
                <li>Never stop learning</li>
            </ul>
            
            <h2>Looking Forward</h2>
            <p>The tech industry constantly evolves, and that's what makes it exciting. Stay curious, stay humble, and keep building.</p>
        `
    },
    {
        id: 4,
        title: "Understanding JavaScript Closures",
        date: "2025-09-05",
        excerpt: "Deep dive into one of JavaScript's most powerful features - closures. Learn how they work and when to use them...",
        content: `
            <h2>What is a Closure?</h2>
            <p>A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.</p>
            
            <h2>Basic Example</h2>
            <pre><code>function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    }
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2</code></pre>
            
            <h2>Practical Use Cases</h2>
            <p>Closures are commonly used for:</p>
            <ul>
                <li>Data privacy and encapsulation</li>
                <li>Function factories</li>
                <li>Event handlers</li>
                <li>Callbacks</li>
            </ul>
            
            <h2>Common Pitfalls</h2>
            <p>Be aware of these common issues:</p>
            <ul>
                <li>Memory leaks if not handled properly</li>
                <li>Loop variable capture problems</li>
                <li>Performance considerations</li>
            </ul>
            
            <h2>Best Practices</h2>
            <p>Use closures when you need private state or want to create specialized functions. But remember: with great power comes great responsibility!</p>
        `
    }
];

// DOM Elements
let currentSection = 'home';
let modal = null;

// Initialize the site
function init() {
    renderPortfolio();
    renderGallery();
    renderBlog();
    setupNavigation();
    setupModal();
    startUptime();
}

// Render portfolio projects
function renderPortfolio() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    
    grid.innerHTML = portfolioProjects.map(project => `
        <div class="project-card">
            <h3>[ ${project.title} ]</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Render photo gallery
function renderGallery() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = galleryPhotos.map(photo => `
        <div class="gallery-item">
            <div class="gallery-placeholder">${photo.placeholder}</div>
        </div>
    `).join('');
}

// Render blog posts
function renderBlog() {
    const blogList = document.querySelector('.blog-list');
    if (!blogList) return;
    
    blogList.innerHTML = blogPosts.map(post => `
        <article class="blog-post" data-post-id="${post.id}">
            <div class="blog-post-header">
                <h3>[ ${post.title} ]</h3>
                <span class="blog-date">${formatDate(post.date)}</span>
            </div>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="#" class="read-more" data-post-id="${post.id}">READ MORE →</a>
        </article>
    `).join('');
    
    // Add click handlers for blog posts
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = parseInt(e.target.dataset.postId);
            openBlogPost(postId);
        });
    });
}

// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show/hide sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
            
            currentSection = sectionId;
        });
    });
}

// Setup modal for blog posts
function setupModal() {
    // Create modal element
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Open blog post in modal
function openBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <h1 class="article-title">${post.title}</h1>
        <div class="article-meta">
            <span>Published: ${formatDate(post.date)}</span>
        </div>
        <div class="article-content">
            ${post.content}
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Uptime counter
function startUptime() {
    const uptimeElement = document.getElementById('uptime');
    if (!uptimeElement) return;
    
    let seconds = 0;
    
    setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        uptimeElement.textContent = `${hours}:${minutes}:${secs}`;
    }, 1000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

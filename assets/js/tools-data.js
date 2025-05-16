/**
 * Tools Data JavaScript
 * Centralized functions for loading and processing tools data
 */

// Global variable to store tools data
let toolsData = [];
let categoriesData = [];
let isDataLoaded = false;
let dataLoadPromise = null;

// Hardcoded tools data to avoid CORS issues with file:// protocol
const toolsDataHardcoded = [
    // JPG Tools
    {
      "id": "jpg-to-png",
      "name": "JPG to PNG Converter",
      "category": "JPG Tools",
      "shortDescription": "Convert your JPG images to PNG format with this free online tool.",
      "longDescription": "Convert your JPG images to PNG format with this free online tool. PNG format supports transparency and lossless compression, making it ideal for graphics, logos, and images with text. All processing happens in your browser - no images are uploaded to any server.",
      "url": "jpg-to-png/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "photo_filter"
    },
    {
      "id": "jpg-to-webp",
      "name": "JPG to WebP Converter",
      "category": "JPG Tools",
      "shortDescription": "Convert your JPG images to WebP format for better compression and quality.",
      "longDescription": "Convert your JPG images to WebP format with this free online tool. WebP offers superior compression and quality compared to JPG, resulting in smaller file sizes without sacrificing image quality. All processing happens in your browser - no images are uploaded to any server.",
      "url": "jpg-to-webp/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "photo_filter"
    },
    {
      "id": "jpg-to-pdf",
      "name": "JPG to PDF Converter",
      "category": "JPG Tools",
      "shortDescription": "Convert your JPG images to PDF documents easily.",
      "longDescription": "Convert your JPG images to PDF documents with this free online tool. Perfect for creating documents from images, combining multiple JPGs into a single PDF, or preparing images for printing. All processing happens in your browser - no images are uploaded to any server.",
      "url": "jpg-to-pdf/index.html",
      "image": "assets/images/tool-icons/picture_as_pdf.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "picture_as_pdf"
    },

    // PNG Tools
    {
      "id": "png-to-jpg",
      "name": "PNG to JPG Converter",
      "category": "PNG Tools",
      "shortDescription": "Convert your PNG images to JPG format with this free online tool.",
      "longDescription": "Convert your PNG images to JPG format with this free online tool. JPG format offers smaller file sizes for photographs and complex images. All processing happens in your browser - no images are uploaded to any server.",
      "url": "png-to-jpg/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "photo_filter"
    },
    {
      "id": "png-to-webp",
      "name": "PNG to WebP Converter",
      "category": "PNG Tools",
      "shortDescription": "Convert your PNG images to WebP format for better compression and quality.",
      "longDescription": "Convert your PNG images to WebP format with this free online tool. WebP offers superior compression and quality compared to PNG, resulting in smaller file sizes while maintaining transparency. All processing happens in your browser - no images are uploaded to any server.",
      "url": "png-to-webp/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "photo_filter"
    },
    {
      "id": "png-to-pdf",
      "name": "PNG to PDF Converter",
      "category": "PNG Tools",
      "shortDescription": "Convert your PNG images to PDF documents easily.",
      "longDescription": "Convert your PNG images to PDF documents with this free online tool. Perfect for creating documents from images, combining multiple PNGs into a single PDF, or preparing images for printing. All processing happens in your browser - no images are uploaded to any server.",
      "url": "png-to-pdf/index.html",
      "image": "assets/images/tool-icons/picture_as_pdf.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "picture_as_pdf"
    },

    // WebP Tools
    {
      "id": "webp-to-jpg",
      "name": "WebP to JPG Converter",
      "category": "WebP Tools",
      "shortDescription": "Convert your WebP images to JPG format with this free online tool.",
      "longDescription": "Convert your WebP images to JPG format with this free online tool. Useful for compatibility with applications that don't support WebP. All processing happens in your browser - no images are uploaded to any server.",
      "url": "webp-to-jpg/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "photo_filter"
    },
    {
      "id": "webp-to-png",
      "name": "WebP to PNG Converter",
      "category": "WebP Tools",
      "shortDescription": "Convert your WebP images to PNG format with this free online tool.",
      "longDescription": "Convert your WebP images to PNG format with this free online tool. Useful for maintaining transparency and for compatibility with applications that don't support WebP. All processing happens in your browser - no images are uploaded to any server.",
      "url": "webp-to-png/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "photo_filter"
    },

    // SVG Tools
    {
      "id": "svg-to-png",
      "name": "SVG to PNG Converter",
      "category": "SVG Tools",
      "shortDescription": "Convert your SVG vector graphics to PNG raster images.",
      "longDescription": "Convert your SVG vector graphics to PNG raster images with this free online tool. Useful for using vector graphics in applications that don't support SVG. All processing happens in your browser - no images are uploaded to any server.",
      "url": "svg-to-png/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "photo_filter"
    },
    {
      "id": "svg-to-jpg",
      "name": "SVG to JPG Converter",
      "category": "SVG Tools",
      "shortDescription": "Convert your SVG vector graphics to JPG raster images.",
      "longDescription": "Convert your SVG vector graphics to JPG raster images with this free online tool. Useful for using vector graphics in applications that don't support SVG. All processing happens in your browser - no images are uploaded to any server.",
      "url": "svg-to-jpg/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "photo_filter"
    },
    {
      "id": "svg-to-webp",
      "name": "SVG to WebP Converter",
      "category": "SVG Tools",
      "shortDescription": "Convert your SVG vector graphics to WebP raster images.",
      "longDescription": "Convert your SVG vector graphics to WebP raster images with this free online tool. WebP offers superior compression and quality compared to other formats. All processing happens in your browser - no images are uploaded to any server.",
      "url": "svg-to-webp/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "photo_filter"
    },

    // GIF Tools
    {
      "id": "gif-to-png",
      "name": "GIF to PNG Converter",
      "category": "GIF Tools",
      "shortDescription": "Convert your GIF animations to PNG image sequences.",
      "longDescription": "Convert your GIF animations to PNG image sequences with this free online tool. Useful for extracting frames from GIFs or converting static GIFs to PNG format. All processing happens in your browser - no images are uploaded to any server.",
      "url": "gif-to-png/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "photo_filter"
    },
    {
      "id": "gif-to-jpg",
      "name": "GIF to JPG Converter",
      "category": "GIF Tools",
      "shortDescription": "Convert your GIF animations to JPG image sequences.",
      "longDescription": "Convert your GIF animations to JPG image sequences with this free online tool. Useful for extracting frames from GIFs or converting static GIFs to JPG format. All processing happens in your browser - no images are uploaded to any server.",
      "url": "gif-to-jpg/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "photo_filter"
    },
    {
      "id": "gif-to-webp",
      "name": "GIF to WebP Converter",
      "category": "GIF Tools",
      "shortDescription": "Convert your GIF animations to animated WebP format.",
      "longDescription": "Convert your GIF animations to animated WebP format with this free online tool. WebP animations offer better compression than GIFs while maintaining quality. All processing happens in your browser - no images are uploaded to any server.",
      "url": "gif-to-webp/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "photo_filter"
    },

    // BMP Tools
    {
      "id": "bmp-to-png",
      "name": "BMP to PNG Converter",
      "category": "BMP Tools",
      "shortDescription": "Convert your BMP images to PNG format with this free online tool.",
      "longDescription": "Convert your BMP images to PNG format with this free online tool. PNG offers better compression than BMP while maintaining image quality and supporting transparency. All processing happens in your browser - no images are uploaded to any server.",
      "url": "bmp-to-png/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "photo_filter"
    },
    {
      "id": "bmp-to-jpg",
      "name": "BMP to JPG Converter",
      "category": "BMP Tools",
      "shortDescription": "Convert your BMP images to JPG format with this free online tool.",
      "longDescription": "Convert your BMP images to JPG format with this free online tool. JPG offers much smaller file sizes than BMP, making it ideal for photographs and complex images. All processing happens in your browser - no images are uploaded to any server.",
      "url": "bmp-to-jpg/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "photo_filter"
    },
    {
      "id": "bmp-to-webp",
      "name": "BMP to WebP Converter",
      "category": "BMP Tools",
      "shortDescription": "Convert your BMP images to WebP format with this free online tool.",
      "longDescription": "Convert your BMP images to WebP format with this free online tool. WebP offers superior compression and quality compared to BMP, resulting in much smaller file sizes. All processing happens in your browser - no images are uploaded to any server.",
      "url": "bmp-to-webp/index.html",
      "image": "assets/images/tool-icons/photo_filter.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "photo_filter"
    },

    // Image Tools (General)
    {
      "id": "image-resizer",
      "name": "Image Resizer",
      "category": "Image Tools",
      "shortDescription": "Resize, crop, and optimize images for web or print.",
      "longDescription": "This tool allows you to resize, crop, and optimize images for web or print. You can specify dimensions, maintain aspect ratio, apply filters, and adjust quality settings. Perfect for preparing images for websites, social media, or print materials.",
      "url": "image-resizer/index.html",
      "image": "assets/images/tool-icons/crop.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "crop"
    },
    {
      "id": "outline-notepad",
      "name": "Outline Notepad",
      "category": "Text Tools",
      "shortDescription": "A simple, distraction-free online text editor for quick notes and writing.",
      "longDescription": "Outline Notepad is a clean, distraction-free text editor that lets you focus on your writing. It features auto-save functionality, markdown support, and the ability to export your notes in multiple formats. Perfect for quick notes, drafts, and temporary text storage.",
      "url": "onlinenotepad/index.html",
      "image": "assets/images/tool-icons/edit_note.svg",
      "isNew": false,
      "isPopular": false,
      "icon": "edit_note"
    },

    {
      "id": "word-counter",
      "name": "Word Counter",
      "category": "Text Tools",
      "shortDescription": "Count words, characters, and paragraphs in your text with detailed statistics.",
      "longDescription": "This tool provides detailed statistics about your text, including word count, character count (with and without spaces), paragraph count, sentence count, and estimated reading time. Great for writers, students, and content creators who need to meet specific length requirements.",
      "url": "word-counter/index.html",
      "image": "assets/images/tool-icons/format_list_numbered.svg",
      "isNew": false,
      "isPopular": false,
      "icon": "format_list_numbered"
    },
    {
      "id": "lorem-ipsum-generator",
      "name": "Lorem Ipsum Generator",
      "category": "Text Tools",
      "shortDescription": "Generate placeholder text for designs and layouts.",
      "longDescription": "Generate Lorem Ipsum placeholder text for your designs, layouts, and mockups. You can specify the number of paragraphs, words, or characters you need, and even include HTML tags. Perfect for designers and developers who need filler text for their projects.",
      "url": "#lorem-ipsum-generator",
      "image": "assets/images/tool-icons/format_align_left.svg",
      "isNew": false,
      "isPopular": false,
      "icon": "format_align_left"
    },
    {
      "id": "file-compressor",
      "name": "File Compressor",
      "category": "File Tools",
      "shortDescription": "Compress files to reduce size for easier sharing and storage.",
      "longDescription": "This tool allows you to compress files to reduce their size for easier sharing and storage. It supports various compression formats including ZIP, RAR, and 7Z. You can compress multiple files at once and set compression levels to balance size and quality.",
      "url": "#file-compressor",
      "image": "assets/images/tool-icons/compress.svg",
      "isNew": false,
      "isPopular": false,
      "icon": "compress"
    },
    {
      "id": "pdf-converter",
      "name": "PDF Converter",
      "category": "File Tools",
      "shortDescription": "Convert documents to and from PDF format with ease.",
      "longDescription": "Convert documents to and from PDF format with ease. This tool supports conversion between PDF and various formats including Word, Excel, PowerPoint, images, and more. It preserves formatting and layout to ensure your documents look exactly as intended.",
      "url": "#pdf-converter",
      "image": "assets/images/tool-icons/picture_as_pdf.svg",
      "isNew": false,
      "isPopular": true,
      "icon": "picture_as_pdf"
    },
    {
      "id": "image-resizer",
      "name": "Image Resizer",
      "category": "Image Tools",
      "shortDescription": "Resize, crop, and optimize images for web or print.",
      "longDescription": "This tool allows you to resize, crop, and optimize images for web or print. You can specify dimensions, maintain aspect ratio, apply filters, and adjust quality settings. Perfect for preparing images for websites, social media, or print materials.",
      "url": "image-resizer/index.html",
      "image": "assets/images/tool-icons/crop.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "crop"
    },
    {
      "id": "meme-generator",
      "name": "Meme Generator",
      "category": "Image Tools",
      "shortDescription": "Create custom memes with your own images and text.",
      "longDescription": "Create custom memes with your own images and text. This tool provides a simple interface for adding text to images, with options for font style, size, color, and position. You can upload your own images or choose from a library of popular meme templates.",
      "url": "#meme-generator",
      "image": "assets/images/tool-icons/sentiment_very_satisfied.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "sentiment_very_satisfied"
    },
    {
      "id": "json-formatter",
      "name": "JSON Formatter",
      "category": "Developer Tools",
      "shortDescription": "Format, validate, and beautify JSON data.",
      "longDescription": "This tool helps you format, validate, and beautify JSON data. It can detect syntax errors, prettify minified JSON, and convert between JSON and other formats like YAML or XML. Essential for developers working with JSON data.",
      "url": "json-formatter/index.html",
      "image": "assets/images/tool-icons/data_object.svg",
      "isNew": false,
      "isPopular": true,
      "icon": "data_object"
    },
    {
      "id": "code-beautifier",
      "name": "Code Beautifier",
      "category": "Developer Tools",
      "shortDescription": "Format and beautify code in various programming languages.",
      "longDescription": "This tool formats and beautifies code in various programming languages including JavaScript, HTML, CSS, Python, Java, and more. It helps improve code readability by applying consistent indentation, spacing, and line breaks.",
      "url": "#code-beautifier",
      "image": "assets/images/tool-icons/format_align_left.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "format_align_left"
    },
    {
      "id": "password-generator",
      "name": "Password Generator",
      "category": "Utility Tools",
      "shortDescription": "Generate strong, secure passwords with customizable options.",
      "longDescription": "This tool generates strong, secure passwords with customizable options for length, character types, and complexity. You can specify whether to include uppercase letters, lowercase letters, numbers, and special characters to meet specific password requirements.",
      "url": "password-generator/index.html",
      "image": "assets/images/tool-icons/password.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "format_align_left"
    },
    {
      "id": "qr-code-generator",
      "name": "QR Code Generator",
      "category": "Utility Tools",
      "shortDescription": "Create QR codes for URLs, text, contact info, and more.",
      "longDescription": "This tool creates QR codes for various types of content including URLs, text, contact information, Wi-Fi credentials, and more. You can customize the QR code's appearance, size, and error correction level, and download it in different formats.",
      "url": "qr-generator/index.html",
      "image": "assets/images/tool-icons/qr_code.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "format_align_left"
    },
    {
      "id": "unit-converter",
      "name": "Unit Converter",
      "category": "Utility Tools",
      "shortDescription": "Convert between different units of measurement.",
      "longDescription": "This comprehensive unit converter allows you to convert between different units of measurement including length, weight, volume, temperature, time, speed, area, and more. It supports both metric and imperial units and provides accurate conversions with formulas.",
      "url": "unit-converter/index.html",
      "image": "assets/images/tool-icons/swap_vert.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "swap_vert"
    },
    {
      "id": "pomodoro-timer",
      "name": "Pomodoro Timer",
      "category": "Productivity Tools",
      "shortDescription": "Boost productivity with timed work sessions and breaks.",
      "longDescription": "This Pomodoro timer helps you boost productivity by breaking work into focused intervals (typically 25 minutes) separated by short breaks. It includes customizable work and break durations, session tracking, and notifications to help you stay on track.",
      "url": "pomodoro-timer/index.html",
      "image": "assets/images/tool-icons/timer.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "timer"
    },
    {
      "id": "todo-list",
      "name": "Todo List",
      "category": "Productivity Tools",
      "shortDescription": "Manage your tasks with a simple and effective todo list.",
      "longDescription": "This simple yet powerful todo list helps you manage your tasks effectively. You can create tasks, set priorities and due dates, organize tasks into categories, and track your progress. It includes features like recurring tasks and subtasks for complex projects.",
      "url": "todo-list/index.html",
      "image": "assets/images/tool-icons/checklist.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "checklist"
    },
    {
      "id": "grade-calculator",
      "name": "Grade Calculator",
      "category": "Math Tools",
      "shortDescription": "Calculate your final grade based on assignments, tests, and exams.",
      "longDescription": "This grade calculator helps students determine their final grade based on assignments, tests, exams, and other assessments. You can assign different weights to each component and see how different scores would affect your final grade.",
      "url": "grade-calculator/index.html",
      "image": "assets/images/tool-icons/grade.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "grade"
    },
    {
      "id": "gpa-calculator",
      "name": "GPA Calculator",
      "category": "Math Tools",
      "shortDescription": "Calculate your Grade Point Average (GPA) with customizable credit hours and grading scales.",
      "longDescription": "This GPA calculator helps students calculate their Grade Point Average (GPA) based on course grades and credit hours. It supports different grading scales (4.0, 5.0, etc.) and can calculate both term GPA and cumulative GPA across multiple terms.",
      "url": "gpa-calculator/index.html",
      "image": "assets/images/tool-icons/school.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "school"
    },
    {
      "id": "mortgage-calculator",
      "name": "Mortgage Calculator",
      "category": "Financial Calculators",
      "shortDescription": "Calculate mortgage payments, interest, and amortization schedules.",
      "longDescription": "This mortgage calculator helps you estimate monthly payments, total interest, and amortization schedules for home loans. You can adjust loan amount, interest rate, term length, and down payment to see how different scenarios affect your mortgage.",
      "url": "mortgage-calculator/index.html",
      "image": "assets/images/tool-icons/home.svg",
      "isNew": true,
      "isPopular": false,
      "icon": "home"
    },
    {
      "id": "bmi-calculator",
      "name": "BMI Calculator",
      "category": "Health Calculators",
      "shortDescription": "Calculate your Body Mass Index (BMI) and understand what it means for your health.",
      "longDescription": "This BMI calculator helps you determine your Body Mass Index (BMI) based on your height and weight. It provides information about what your BMI means for your health, including weight categories and recommendations for maintaining a healthy weight.",
      "url": "bmi-calculator/index.html",
      "image": "assets/images/tool-icons/monitor_weight.svg",
      "isNew": true,
      "isPopular": true,
      "icon": "monitor_weight"
    }
];

/**
 * Load tools data from the hardcoded array instead of fetching from a file
 * @returns {Promise} Promise that resolves when data is loaded
 */
function loadToolsData() {
    // If data is already loaded, return a resolved promise
    if (isDataLoaded) {
        return Promise.resolve(toolsData);
    }

    // If a load is already in progress, return the existing promise
    if (dataLoadPromise) {
        return dataLoadPromise;
    }

    // Use hardcoded data instead of fetching from a file
    dataLoadPromise = new Promise((resolve) => {
        // Use the hardcoded data
        toolsData = toolsDataHardcoded;

        // Extract unique categories
        categoriesData = [...new Set(toolsData.map(tool => tool.category))];

        isDataLoaded = true;
        resolve(toolsData);
    });

    return dataLoadPromise;
}

/**
 * Get all tools
 * @returns {Promise} Promise that resolves with all tools
 */
function getAllTools() {
    return loadToolsData();
}

/**
 * Get popular tools
 * @param {number} limit - Maximum number of tools to return (optional)
 * @returns {Promise} Promise that resolves with popular tools
 */
function getPopularTools(limit) {
    return loadToolsData()
        .then(tools => {
            const popularTools = tools.filter(tool => tool.isPopular);
            return limit ? popularTools.slice(0, limit) : popularTools;
        });
}

/**
 * Get new tools
 * @param {number} limit - Maximum number of tools to return (optional)
 * @returns {Promise} Promise that resolves with new tools
 */
function getNewTools(limit) {
    return loadToolsData()
        .then(tools => {
            const newTools = tools.filter(tool => tool.isNew);
            return limit ? newTools.slice(0, limit) : newTools;
        });
}

/**
 * Get tools by category
 * @param {string} category - Category name
 * @returns {Promise} Promise that resolves with tools in the specified category
 */
function getToolsByCategory(category) {
    return loadToolsData()
        .then(tools => {
            return tools.filter(tool => tool.category === category);
        });
}

/**
 * Get all categories
 * @returns {Promise} Promise that resolves with all categories
 */
function getAllCategories() {
    return loadToolsData()
        .then(() => categoriesData);
}

/**
 * Search tools by term
 * @param {string} searchTerm - Term to search for
 * @returns {Promise} Promise that resolves with matching tools
 */
function searchTools(searchTerm) {
    if (!searchTerm) return Promise.resolve([]);

    const term = searchTerm.toLowerCase();

    return loadToolsData()
        .then(tools => {
            return tools.filter(tool =>
                tool.name.toLowerCase().includes(term) ||
                tool.shortDescription.toLowerCase().includes(term) ||
                tool.longDescription.toLowerCase().includes(term) ||
                tool.category.toLowerCase().includes(term)
            );
        });
}

/**
 * Get similar tools based on a tool's category
 * @param {string} toolId - ID of the tool to find similar tools for
 * @param {number} limit - Maximum number of similar tools to return
 * @returns {Promise} Promise that resolves with similar tools
 */
function getSimilarTools(toolId, limit = 3) {
    return loadToolsData()
        .then(tools => {
            // Find the tool
            const tool = tools.find(t => t.id === toolId);
            if (!tool) return [];

            // Get other tools in the same category
            const similarTools = tools.filter(t =>
                t.category === tool.category &&
                t.id !== toolId
            );

            // Return a random selection if there are more than the limit
            if (similarTools.length > limit) {
                // Shuffle array
                const shuffled = [...similarTools].sort(() => 0.5 - Math.random());
                return shuffled.slice(0, limit);
            }

            return similarTools;
        });
}

/**
 * Create HTML for a tool card
 * @param {Object} tool - Tool data
 * @returns {string} HTML for the tool card
 */
function createToolCardHTML(tool) {
    // Make the entire card clickable by wrapping it in an anchor tag
    return `
        <div class="tool-card" data-category="${tool.category.toLowerCase().replace(/\s+/g, '-')}" data-id="${tool.id}" onclick="window.location.href='${tool.url}';" style="cursor: pointer;">
            <div class="tool-icon">
                <img src="assets/images/tool-icons/${tool.icon}.svg" alt="${tool.name} Icon" width="48" height="48">
            </div>
            <h3>${tool.name}</h3>
            <p>${tool.shortDescription}</p>
            <a href="${tool.url}" class="tool-link" onclick="event.stopPropagation();">Try Now</a>
        </div>
    `;
}

/**
 * Get SVG path for a tool icon
 * @param {string} icon - Icon name
 * @returns {string} SVG path
 */
function getSVGPathForTool(icon) {
    // Map of icon names to SVG paths
    const iconPaths = {
        'edit_note': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z',
        'picture_as_pdf': 'M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z',
        'photo_filter': 'M19 10v9H4.98V5h9V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zm-2.94-2.06L17 10l.94-2.06L20 7l-2.06-.94L17 4l-.94 2.06L14 7zM12 8l-1.25 2.75L8 12l2.75 1.25L12 16l1.25-2.75L16 12l-2.75-1.25z',
        'data_object': 'M4 7v2c0 .55-.45 1-1 1H2v4h1c.55 0 1 .45 1 1v2c0 1.65 1.35 3 3 3h3v-2H7c-.55 0-1-.45-1-1v-2c0-1.3-.84-2.42-2-2.83v-.34C5.16 11.42 6 10.3 6 9V7c0-.55.45-1 1-1h3V4H7C5.35 4 4 5.35 4 7zm17 3c-.55 0-1-.45-1-1V7c0-1.65-1.35-3-3-3h-3v2h3c.55 0 1 .45 1 1v2c0 1.3.84 2.42 2 2.83v.34c-1.16.41-2 1.52-2 2.83v2c0 .55-.45 1-1 1h-3v2h3c1.65 0 3-1.35 3-3v-2c0-.55.45-1 1-1h1v-4h-1z',
        'format_align_left': 'M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z',
        'password': 'M2 17h20v2H2v-2zm1.15-4.05L4 11.47l.85 1.48 1.3-.75-.85-1.48H7v-1.5H5.3l.85-1.47L4.85 7 4 8.47 3.15 7l-1.3.75.85 1.47H1v1.5h1.7l-.85 1.48 1.3.75zm6.7-.75l1.3.75.85-1.48.85 1.48 1.3-.75-.85-1.48H15v-1.5h-1.7l.85-1.47-1.3-.75L12 8.47 11.15 7l-1.3.75.85 1.47H9v1.5h1.7l-.85 1.48zM23.85 7l-1.3-.75L21.7 7.75l-.85-1.47-1.3.75.85 1.47H18.7v1.5h1.7l-.85 1.48 1.3.75.85-1.48.85 1.48 1.3-.75-.85-1.48h1.7v-1.5h-1.7l.85-1.47z',
        'qr_code': 'M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-3v2h3v3h2v-3h3v-2h-3v-3h-2v3z',
        'swap_vert': 'M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z',
        'security': 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
        'table_chart': 'M10 10.02h5V15h-5zM17 10.02h5V15h-5zM3 10.02h5V15H3zM3 3h5v5H3zm7 0h5v5h-5zm7 0h5v5h-5z',
        'date_range': 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z',
        'find_replace': 'M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z',
        'compress': 'M8 19h3v3h2v-3h3l-4-4-4 4zm8-15h-3V1h-2v3H8l4 4 4-4zM4 9v2h16V9H4z',
        'storage': 'M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z',
        'grid_view': 'M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z',
        'timer': 'M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z',
        'calendar_today': 'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z',
        'checklist': 'M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11 2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 19z',
        'trending_up': 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
        'grade': 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
        'school': 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
        'home': 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
        'monitor_weight': 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z',
        'calculator': 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm-8 8H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V8h2v2z'
    };

    // Return the path for the icon, or a default path if not found
    return iconPaths[icon] || 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z';
}

/**
 * Create HTML for a tool dropdown item
 * @param {Object} tool - Tool data
 * @param {string} iconColor - Color for the icon (optional)
 * @returns {string} HTML for the tool dropdown item
 */
function createToolDropdownHTML(tool, iconColor = '#00C4CC') {
    // Ensure the URL is correct
    const url = tool.url.startsWith('http') ? tool.url : tool.url;

    return `
        <a href="${url}" class="dropdown-tool-link">
            <div class="dropdown-tool-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${iconColor}">
                    <path d="${getSVGPathForTool(tool.icon)}"/>
                </svg>
            </div>
            ${tool.name}
        </a>
    `;
}

/**
 * Populate footer popular tools
 */
function populateFooterPopularTools() {
    const footerPopularToolsList = document.getElementById('footer-popular-tools');
    if (!footerPopularToolsList) return;

    getPopularTools(5)
        .then(popularTools => {
            footerPopularToolsList.innerHTML = '';
            popularTools.forEach(tool => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = tool.url;
                a.textContent = tool.name;
                li.appendChild(a);
                footerPopularToolsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error populating footer popular tools:', error);
        });
}

// Initialize footer popular tools when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateFooterPopularTools();
});

// Export functions for use in other files
window.toolsDataModule = {
    loadToolsData,
    getAllTools,
    getPopularTools,
    getNewTools,
    getToolsByCategory,
    getAllCategories,
    searchTools,
    getSimilarTools,
    createToolCardHTML,
    createToolDropdownHTML,
    populateFooterPopularTools
};

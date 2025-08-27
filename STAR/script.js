let selectedPattern = 'star';

function selectPattern(patternType) {
    // Remove selected class from all pattern options
    document.querySelectorAll('.pattern-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked pattern
    event.currentTarget.classList.add('selected');
    
    // Update selected pattern
    selectedPattern = patternType;
    
    // Generate pattern preview
    generatePattern();
}

function generatePattern() {
    const rows = parseInt(document.getElementById('rows').value) || 5;
    let pattern = '';

    switch(selectedPattern) {
        case 'star':
            pattern = generateStarPattern(rows);
            break;
        case 'number':
            pattern = generateNumberPattern(rows);
            break;
        case 'alphabet':
            pattern = generateAlphabetPattern(rows);
            break;
        case 'pyramid':
            pattern = generatePyramidPattern(rows);
            break;
        case 'diamond':
            pattern = generateDiamondPattern(rows);
            break;
        case 'butterfly':
            pattern = generateButterflyPattern(rows);
            break;
        case 'hollowSquare':
            pattern = generateHollowSquarePattern(rows);
            break;
        case 'pascal':
            pattern = generatePascalTriangle(rows);
            break;
    }

    document.getElementById('patternOutput').textContent = pattern;
}

function generateStarPattern(rows) {
    let pattern = '';
    for(let i = 1; i <= rows; i++) {
        for(let j = 1; j <= i; j++) {
            pattern += '*';
        }
        pattern += '\n';
    }
    return pattern;
}

function generateNumberPattern(rows) {
    let pattern = '';
    for(let i = 1; i <= rows; i++) {
        for(let j = 1; j <= i; j++) {
            pattern += i;
        }
        pattern += '\n';
    }
    return pattern;
}

function generateAlphabetPattern(rows) {
    let pattern = '';
    for(let i = 0; i < rows; i++) {
        const char = String.fromCharCode(65 + i);
        for(let j = 0; j <= i; j++) {
            pattern += char;
        }
        pattern += '\n';
    }
    return pattern;
}

function generatePyramidPattern(rows) {
    let pattern = '';
    for(let i = 1; i <= rows; i++) {
        // Add spaces
        for(let j = 1; j <= rows - i; j++) {
            pattern += ' ';
        }
        // Add stars
        for(let k = 1; k <= 2 * i - 1; k++) {
            pattern += '*';
        }
        pattern += '\n';
    }
    return pattern;
}

function generateDiamondPattern(rows) {
    let pattern = '';
    // Upper half
    for(let i = 1; i <= rows; i++) {
        // Add spaces
        for(let j = 1; j <= rows - i; j++) {
            pattern += ' ';
        }
        // Add stars
        for(let k = 1; k <= 2 * i - 1; k++) {
            pattern += '*';
        }
        pattern += '\n';
    }
    // Lower half
    for(let i = rows - 1; i >= 1; i--) {
        // Add spaces
        for(let j = 1; j <= rows - i; j++) {
            pattern += ' ';
        }
        // Add stars
        for(let k = 1; k <= 2 * i - 1; k++) {
            pattern += '*';
        }
        pattern += '\n';
    }
    return pattern;
}

function generateButterflyPattern(rows) {
    let pattern = '';
    // Upper half
    for(let i = 1; i <= rows; i++) {
        // Left stars
        for(let j = 1; j <= i; j++) {
            pattern += '*';
        }
        // Spaces
        for(let k = 1; k <= 2 * (rows - i); k++) {
            pattern += ' ';
        }
        // Right stars
        for(let j = 1; j <= i; j++) {
            pattern += '*';
        }
        pattern += '\n';
    }
    // Lower half
    for(let i = rows - 1; i >= 1; i--) {
        // Left stars
        for(let j = 1; j <= i; j++) {
            pattern += '*';
        }
        // Spaces
        for(let k = 1; k <= 2 * (rows - i); k++) {
            pattern += ' ';
        }
        // Right stars
        for(let j = 1; j <= i; j++) {
            pattern += '*';
        }
        pattern += '\n';
    }
    return pattern;
}

function generateHollowSquarePattern(rows) {
    let pattern = '';
    for(let i = 1; i <= rows; i++) {
        for(let j = 1; j <= rows; j++) {
            if(i === 1 || i === rows || j === 1 || j === rows) {
                pattern += '*';
            } else {
                pattern += ' ';
            }
        }
        pattern += '\n';
    }
    return pattern;
}

function generatePascalTriangle(rows) {
    let pattern = '';
    for(let i = 0; i < rows; i++) {
        let num = 1;
        for(let j = 0; j <= i; j++) {
            pattern += num + ' ';
            num = num * (i - j) / (j + 1);
        }
        pattern += '\n';
// Initialize the page
window.onload = function() {
    // Select the first pattern by default
    document.querySelector('.pattern-option').classList.add('selected');
    generatePattern();
}

// Add event listener to pattern options
document.querySelectorAll('.pattern-option').forEach(option => {
    option.addEventListener('click', selectPattern);
});

// Refactor selectPattern function
function selectPattern(event) {
    // Remove selected class from all pattern options
    document.querySelectorAll('.pattern-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked pattern
    event.currentTarget.classList.add('selected');
    
    // Update selected pattern
    let selectedPattern = event.currentTarget.dataset.pattern;
    
    // Generate pattern preview
    generatePattern(selectedPattern);
}

// Refactor generatePattern function
function generatePattern(selectedPattern) {
    const rows = parseInt(document.getElementById('rows').value) || 5;
    let pattern = '';

    switch(selectedPattern) {
        case 'star':
            pattern = generateStarPattern(rows);
            break;
        case 'number':
            pattern = generateNumberPattern(rows);
            break;
        case 'alphabet':
            pattern = generateAlphabetPattern(rows);
            break;
        case 'pyramid':
            pattern = generatePyramidPattern(rows);
            break;
        case 'diamond':
            pattern = generateDiamondPattern(rows);
            break;
        case 'butterfly':
            pattern = generateButterflyPattern(rows);
            break;
        case 'hollowSquare':
            pattern = generateHollowSquarePattern(rows);
            break;
        case 'pascal':
            pattern = generatePascalTriangle(rows);
            break;
        default:
            console.error('Invalid pattern selected');
    }

    document.getElementById('patternOutput').textContent = pattern;
}

// Refactor pattern generation functions
function generateStarPattern(rows) {
    return Array(rows).fill().map((_, i) => '*'.repeat(i + 1)).join('\n');
}

function generateNumberPattern(rows) {
    return Array(rows).fill().map((_, i) => (i + 1).toString().repeat(i + 1)).join('\n');
}

function generateAlphabetPattern(rows) {
    return Array(rows).fill().map((_, i) => String.fromCharCode(65 + i).repeat(i + 1)).join('\n');
}

function generatePyramidPattern(rows) {
    return Array(rows).fill().map((_, i) => ' '.repeat(rows - i - 1) + '*'.repeat(2 * i + 1)).join('\n');
}

function generateDiamondPattern(rows) {
    const upperHalf = Array(rows).fill().map((_, i) => ' '.repeat(rows - i - 1) + '*'.repeat(2 * i + 1)).join('\n');
    const lowerHalf = Array(rows - 1).fill().map((_, i) => ' '.repeat(i + 1) + '*'.repeat(2 * (rows - i - 1) - 1)).join('\n');
    return upperHalf + '\n' + lowerHalf;
}

function generateButterflyPattern(rows) {
    const upperHalf = Array(rows).fill().map((_, i) => '*'.repeat(i + 1) + ' '.repeat(2 * (rows - i - 1)) + '*'.repeat(i + 1)).join('\n');
    const lowerHalf = Array(rows - 1).fill().map((_, i) => '*'.repeat(rows - i - 1) + ' '.repeat(2 * (i + 1)) + '*'.repeat(rows - i - 1)).join('\n');
    return upperHalf + '\n' + lowerHalf;
}

function generateHollowSquarePattern(rows) {
    return Array(rows).fill().map((_, i) => {
        if (i === 0 || i === rows - 1) {
            return '*'.repeat(rows);
        } else {
            return '*' + ' '.repeat(rows - 2) + '*';
        }
    }).join('\n');
}

function generatePascalTriangle(rows) {
    return Array(rows).fill().map((_, i) => {
        let num = 1;
        return Array(i + 1).fill().map(() => {
            const result = num;
            num = num * (i - num + 1) / (num);
            return result;
        }).join(' ');
    }).join('\n');
}    }
    return pattern;
}

// Initialize the page
window.onload = function() {
    // Select the first pattern by default
    document.querySelector('.pattern-option').classList.add('selected');
    generatePattern();
} 
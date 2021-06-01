const nodes = [].slice.call(document.querySelectorAll('li'), 0);
const directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
const classNames = ['in', 'out'].map(p => Object.values(directions).map(d => `${p}-${d}`)).reduce((a, b) => a.concat(b));

const getDirectionKey = (ev, node) => {
    const { width, height, top, left } = node.getBoundingClientRect();
    const l = ev.pageX - (left + window.pageXOffset);
    const t = ev.pageY - (top + window.pageYOffset);
    const x = l - width / 2 * (width > height ? height / width : 1);
    const y = t - height / 2 * (height > width ? width / height : 1);
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
};

class Item {
    constructor(element) {
        this.element = element;
        this.element.addEventListener('mouseover', ev => this.update(ev, 'in'));
        this.element.addEventListener('mouseout', ev => this.update(ev, 'out'));
    }

    update(ev, prefix) {
        this.element.classList.remove(...classNames);
        this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
    }
}


nodes.forEach(node => new Item(node));

$("#sortingIcon").click(function () {
    $('html,body').animate({
        scrollTop: $(".sorting").offset().top
    },
        'slow');
});

$("#searchingIcon").click(function () {
    $('html,body').animate({
        scrollTop: $(".searching").offset().top
    },
        'slow');
});

$("#backtrackingIcon").click(function () {
    $('html,body').animate({
        scrollTop: $(".searching").offset().top
    },
        'slow');
});

window.onscroll = function () { scrollHeader() };

// Get the header
var header = document.getElementById("allCourses");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function scrollHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
const uuid = () => {
    return `xxxxxxxx-xxxx-xxxx-xxxx-${Date.now()}`.replace(/x/g, function(){
        return Math.floor(Math.random() * 16).toString(16);
    });
};

const draggable = (ev, items) => {
    if (Array.isArray(items) === false) items = [items];
    const drag = {x: ev.pageX, y: ev.pageY};

    const dragmove = ({ pageX, pageY }) => {
        items.forEach(({ pos }) => {
            pos.x -= drag.x - pageX;
            pos.y -= drag.y - pageY;
        });

        drag.x = pageX;
        drag.y = pageY;
    };

    const dragend = ev => {
        document.removeEventListener('mousemove', dragmove);
        document.removeEventListener('mouseup', dragend);
    };

    document.addEventListener('mousemove', dragmove);
    document.addEventListener('mouseup', dragend);
};
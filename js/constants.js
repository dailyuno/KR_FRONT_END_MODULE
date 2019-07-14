const TOP_NODE = {
    center: {x: 50, y: 0},
    coordinate: {x: 0, y: -150},
    type: 'top',
    relation: 3
};

const RIGHT_NODE = {
    center: {x: 100, y: 50},
    coordinate: {x: 150, y: 0},
    type: 'right',
    relation: 4
};

const BOTTOM_NODE = {
    center: {x: 50, y: 100},
    coordinate: {x: 0, y: 150},
    type: 'bottom',
    relation: 1
};

const LEFT_NODE = {
    center: {x: 0, y: 50},
    coordinate: {x: -150, y: 0},
    type: 'left',
    relation: 2
};

const NODES =  [
    {
        id: 1,
        ...TOP_NODE
    },
    {
        id: 2,
        ...RIGHT_NODE
    },
    {
        id: 3,
        ...BOTTOM_NODE
    },
    {
        id: 4,
        ...LEFT_NODE
    }
];
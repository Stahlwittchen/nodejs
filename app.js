const express = require('express');
const app = express();
const _ = require('underscore');
const  users = [
    {
        id: '1',
        name: 'Supreme T-Shirt',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: '2',
        name: 'Supreme T-Shirt 2',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    }
];

app.listen(3003);

app.get('/employees/:id', function (req, res) {
    const  employee =  _.find(users, {id: req.params.id});
    console.log(req.params.id);
    if (employee === undefined){
        res.status(404)
            .json({message: `Employee with id ${req.params.id} not found`})
    }
    res.json(employee);
})
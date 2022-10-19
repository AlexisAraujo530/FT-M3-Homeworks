const { BADHINTS } = require('dns');
const fs = require('fs');
const request = require('request');

const echo = (args, print) => {
    print(args.join(' '));
};
const pwd = (args, print) => {
    print(process.cwd());
};
const date = (args, print) => {
    print(Date());
};
const ls = (args, print) => {
    fs.readdir('.', (err, files) => {
        if (err) throw err;
        print(files.join('\n '));
    });
};
const cat = (args, print) => {
    fs.readFile(args[0],"utf-8", (err, data) => {
        if (err) throw err;
        print(data);
    });
};
const head = (args, print) => {
    fs.readFile(args[0],"utf-8", (err, data) => {
        if (err) throw err;
        print(data.split('\n').slice(0,5).join('\n'));

    });
};
const tail = (args, print) => {
    fs.readFile(args[0],"utf-8", (err, data) => {
        if (err) throw err;
        print(data.split('\n').slice(-5).join('\n'));
    
        });
};
const curl = (args, print) => {
    request(args[0],(err, data) => {
        if (err) throw err;
        print(data.body);
    });
};



module.exports = {
    echo,
    pwd,
    date,
    ls,
    cat,
    head,
    tail,
    curl,
};
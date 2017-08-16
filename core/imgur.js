const fs = require('fs');
const request = require('request');

const configs = {
    CLIENT_ID: 'f1cf257842224fd',
    CLIENT_SECRET: '7f6d96fc4b4edc9fbea5ef136a3d1c3901954ba1',
    URL: 'https://api.imgur.com/3/image'
};

function upload(path, cb) {
    return request({
        method: 'POST',
        url: configs.URL,
        headers: {
            'Authorization': `Client-ID ${configs.CLIENT_ID}`,
            'Content-Type' :'application/x-www-form-urlencoded'
        },
        formData: { 
            image : fs.createReadStream(path)
        }
    }, cb);
}

module.exports = upload;
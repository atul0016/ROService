const fs = require('fs');
let c = fs.readFileSync('app/page.jsx', 'utf8');
c = c.replace(/<img[^>]+product\.title\} \/>/g, '<img src={product.image && typeof product.image === \'string\' && product.image.startsWith(\'http\') ? product.image : \/\\} alt={product.title} />');
fs.writeFileSync('app/page.jsx', c);

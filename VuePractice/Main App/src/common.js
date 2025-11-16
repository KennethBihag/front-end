const gHeaderOpts = [
    'Home', 'Leet Code', 'Model Viewer'
];

const gPaths = gHeaderOpts.map( ho => '/' + ho.replace(' ',''));
gPaths[0] = '/';

export {gHeaderOpts, gPaths};
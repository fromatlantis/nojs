/**
 * @author Vincent
 * @description can also use node-fs fetch..
 */
'use strict';
var _=require('../lib/underscore.js');
function Template(options){
	var opts=options||{};
	this.tmpl_name=opts.tmplName;
	this.tmpl_data=opts.tmplData;
}
Template.prototype.getHtml=function() {
	var tmpl_name=this.tmpl_name,tmpl_data=this.tmpl_data;
	var tmpl_string=this.tmpl_name;
    if ( ! this.tmpl_cache ) { 
        this.tmpl_cache = {};
    }
    if ( ! this.tmpl_cache[tmpl_name] ) {
        //var tmpl_dir = './templates';
        //var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';
        //tmpl_string=require(tmpl_dir);
        this.tmpl_cache[tmpl_name] = _.template(tmpl_string);
    }
    return this.tmpl_cache[tmpl_name](tmpl_data);
}
module.exports=Template;
//修改图片url，以获取指定大小的图片
export function formatUrl(url, size) {
    if (url) {
        var i = url.lastIndexOf('.');
        var a = url.slice(0, i);
        var b = url.slice(i);
        return a + size + b
    }else{
        return ''
    }

}
export default class Util {
    dateFormat(date, type = 'date') {
        if (date instanceof Date) {
            let mat = {};

            mat.M = date.getMonth() + 1; // 月份记得加1
            mat.H = date.getHours();
            mat.s = date.getSeconds();
            mat.m = date.getMinutes();
            mat.Y = date.getFullYear();
            mat.D = date.getDate();
            mat.d = date.getDay(); // 星期几
            mat.d = this._check(mat.d);
            mat.H = this._check(mat.H);
            mat.M = this._check(mat.M);
            mat.D = this._check(mat.D);
            mat.s = this._check(mat.s);
            mat.m = this._check(mat.m);

            if (type === 'time') {
                return `${mat.Y}-${mat.M}-${mat.D} ${mat.H}:${mat.m}:${mat.s}`;
            } else {
                return `${mat.Y}-${mat.M}-${mat.D}`;
            }
        } else {
            return date;
        }
    }
    
    format(time, format) {
		var t = new Date(time);
		var tf = function(i) {
			return(i < 10 ? '0' : '') + i
		};
		return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
			switch(a) {
				case'yyyy':
				return tf(t.getFullYear());
				break;
				case'MM':
				return tf(t.getMonth() + 1);
				break;
				case'mm':
				return tf(t.getMinutes());
				break;
				case'dd':
				return tf(t.getDate());
				break;
				case'HH':
				return tf(t.getHours());
				break;
				case'ss':
				return tf(t.getSeconds());
				break;
			}
		})
	}
    // 检查是不是两位数字，不足补全
    _check(str) {
        str = str.toString();
        if (str.length < 2) {
            str = '0' + str;
        }
        return str;
    }
}

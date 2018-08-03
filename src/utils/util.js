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
   	clock(){
   		
		//gets current time and changes html to reflect it
		function time(){
			var date = new Date(),
				hours = date.getHours(),
				minutes = date.getMinutes(),
				seconds = date.getSeconds();

			//make clock a 12 hour clock instead of 24 hour clock
			hours = (hours > 12) ? (hours - 12) : hours;
			hours = (hours === 0) ? 12 : hours;

			//invokes function to make sure number has at least two digits
			hours = addZero(hours);
			minutes = addZero(minutes);
			seconds = addZero(seconds);

			//changes the html to match results
			document.getElementsByClassName('hours')[0].innerHTML = hours;
			document.getElementsByClassName('minutes')[0].innerHTML = minutes;
			document.getElementsByClassName('seconds')[0].innerHTML = seconds;
		}

		//turns single digit numbers to two digit numbers by placing a zero in front
		function addZero (val){
			return (val <= 9) ? ("0" + val) : val;
		}
		//lights up either am or pm on clock
		function ampm(){
			var date = new Date(),
				hours = date.getHours(),
				am = document.getElementsByClassName("am")[0].classList,
				pm = document.getElementsByClassName("pm")[0].classList;
			
				
			(hours >= 12) ? pm.add("light-on") : am.add("light-on");
			(hours >= 12) ? am.remove("light-on") : pm.remove("light-on");
		}

		//lights up what day of the week it is
		function whatDay(){
			var date = new Date(),
				currentDay = date.getDay(),
				days = document.getElementsByClassName("day");
			//iterates through all divs with a class of "day"
			for (let x=0,len=days.length;x<len;x++){
				//list of classes in current div
				var classArr = days[x].classList;
				(classArr !== undefined) && ((x == currentDay) ? classArr.add("light-on") : classArr.remove("light-on"));
			}
		}
		
			setInterval(function(){
				time();
				ampm();
				whatDay();
			}, 1000);
		
   	}
  
}

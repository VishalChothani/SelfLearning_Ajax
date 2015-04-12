
function information()
{
	var xmlhttp;
	var txt,xx,x,i;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			
			txt="";
			x=xmlhttp.responseXML.documentElement.getElementsByTagName("Employee");
			for (i=0;i<x.length;i++)
			{
				txt=txt + "<div>";
				xx=x[i].getElementsByTagName("Name");
				{
					try
					{
						txt=txt + "<span>" + xx[0].firstChild.nodeValue + "</span>";
					}
					catch (er)
					{
						txt=txt + "<span>&nbsp;</span>";
					}
				}
				xx=x[i].getElementsByTagName("Address");
				{
					try
					{
						txt=txt + "<span>" + xx[0].firstChild.nodeValue + "</span>";
					}
					catch (er)
					{
						txt=txt + "<span>&nbsp;</span>";
					}
				}
				xx=x[i].getElementsByTagName("Age");
				{
					try
					{
						txt=txt + "<span>" + xx[0].firstChild.nodeValue + "</span>";
					}
					catch (er)
					{
						txt=txt + "<span>&nbsp;</span>";
					}
				}
				xx=x[i].getElementsByTagName("Salary");
				{
					try
					{
						txt=txt + "<span>" + xx[0].firstChild.nodeValue + "</span>";
					}
					catch (er)
					{
						txt=txt + "<span>&nbsp;</span>";
					}
				}
				txt=txt + "</div>";
			}
			document.getElementById('xml-contents').innerHTML=txt;
		}
	}
	xmlhttp.open("GET","../html-xml/first.xml",true);
	xmlhttp.send();
}

/* artcile */
function articles()
{
	var a= "news2";
	article(a);
}

function article(a)
{
	var xmlhttp;
	var txt,xx,x,i;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	//var tit = document.getElementById("article-screen");
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			
			txt="";
			x=xmlhttp.responseText;
			
			document.getElementById('article-screen').innerHTML=x;
		}
	}
	if(a=="news2")
	{
		xmlhttp.open("GET","../text/"+a+".txt",true);
		xmlhttp.send();
	}
	else
	{
		var x= a.value;
		xmlhttp.open("GET","../text/"+x+".txt",true);
		xmlhttp.send();
	}
}



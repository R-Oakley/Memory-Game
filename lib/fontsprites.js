(function(window) {
spritesheet = function() {
	this.initialize();
}
spritesheet._SpriteSheet = new createjs.SpriteSheet({images: ["fontsprites.png"], frames: [[1,1,17,31,0,0,0],[19,1,17,31,0,0,0],[37,1,17,31,0,0,0],[55,1,17,31,0,0,0],[73,1,17,31,0,0,0],[91,1,17,31,0,0,0],[109,1,17,31,0,0,0],[127,1,17,31,0,0,0],[145,1,17,31,0,0,0],[163,1,17,31,0,0,0],[181,1,125,50,0,-1,-1],[1,52,1004,604,0,-1,-1],[1006,52,17,31,0,0,0],[1,657,17,31,0,0,0],[19,657,17,31,0,0,0],[37,657,17,31,0,0,0],[55,657,17,31,0,0,0],[73,657,17,31,0,0,0],[91,657,17,31,0,0,0],[109,657,17,31,0,0,0],[127,657,17,31,0,0,0],[145,657,17,31,0,0,0],[163,657,17,31,0,0,0],[181,657,17,31,0,0,0],[199,657,17,31,0,0,0],[217,657,17,31,0,0,0],[235,657,17,31,0,0,0],[253,657,17,31,0,0,0],[271,657,17,31,0,0,0],[289,657,17,31,0,0,0],[307,657,17,31,0,0,0],[325,657,17,31,0,0,0],[343,657,17,31,0,0,0],[361,657,17,31,0,0,0],[379,657,17,31,0,0,0],[397,657,17,31,0,0,0],[415,657,17,31,0,0,0],[433,657,17,31,0,0,0],[451,657,17,31,0,0,0],[469,657,17,31,0,0,0],[487,657,17,31,0,0,0],[505,657,17,31,0,0,0],[523,657,17,31,0,0,0],[541,657,17,31,0,0,0],[559,657,17,31,0,0,0],[577,657,17,31,0,0,0],[595,657,17,31,0,0,0],[613,657,17,31,0,0,0],[631,657,17,31,0,0,0],[649,657,17,31,0,0,0],[667,657,17,31,0,0,0],[685,657,17,31,0,0,0],[703,657,17,31,0,0,0],[721,657,17,31,0,0,0],[739,657,17,31,0,0,0],[757,657,17,31,0,0,0],[775,657,17,31,0,0,0],[793,657,17,31,0,0,0],[811,657,17,31,0,0,0],[829,657,17,31,0,0,0],[847,657,17,31,0,0,0],[865,657,17,31,0,0,0],[883,657,17,31,0,0,0],[901,657,17,31,0,0,0]],  animations: {0:[0,0, true], 1:[1,1, true], 2:[2,2, true], 3:[3,3, true], 4:[4,4, true], 5:[5,5, true], 6:[6,6, true], 7:[7,7, true], 8:[8,8, true], 9:[9,9, true], btnNewGame:[10,10, true], overlay:[11,11, true], A:[12,12, true], B:[13,13, true], C:[14,14, true], D:[15,15, true], E:[16,16, true], F:[17,17, true], G:[18,18, true], H:[19,19, true], I:[20,20, true], J:[21,21, true], K:[22,22, true], L:[23,23, true], M:[24,24, true], N:[25,25, true], O:[26,26, true], P:[27,27, true], Q:[28,28, true], R:[29,29, true], S:[30,30, true], T:[31,31, true], U:[32,32, true], V:[33,33, true], W:[34,34, true], X:[35,35, true], Y:[36,36, true], Z:[37,37, true], a:[38,38, true], b:[39,39, true], c:[40,40, true], d:[41,41, true], e:[42,42, true], f:[43,43, true], g:[44,44, true], h:[45,45, true], i:[46,46, true], j:[47,47, true], k:[48,48, true], l:[49,49, true], m:[50,50, true], n:[51,51, true], o:[52,52, true], p:[53,53, true], q:[54,54, true], r:[55,55, true], s:[56,56, true], t:[57,57, true], u:[58,58, true], v:[59,59, true], w:[60,60, true], x:[61,61, true], y:[62,62, true], z:[63,63, true]}});
var spritesheet_p = spritesheet.prototype = new createjs.Sprite();
spritesheet_p.Sprite_initialize = spritesheet_p.initialize;
spritesheet_p.initialize = function() {
	this.Sprite_initialize(spritesheet._SpriteSheet);
	this.paused = false;
}
spritesheet_p.0 = function(){
	this.gotoAndPlay("0");
}
spritesheet_p.1 = function(){
	this.gotoAndPlay("1");
}
spritesheet_p.2 = function(){
	this.gotoAndPlay("2");
}
spritesheet_p.3 = function(){
	this.gotoAndPlay("3");
}
spritesheet_p.4 = function(){
	this.gotoAndPlay("4");
}
spritesheet_p.5 = function(){
	this.gotoAndPlay("5");
}
spritesheet_p.6 = function(){
	this.gotoAndPlay("6");
}
spritesheet_p.7 = function(){
	this.gotoAndPlay("7");
}
spritesheet_p.8 = function(){
	this.gotoAndPlay("8");
}
spritesheet_p.9 = function(){
	this.gotoAndPlay("9");
}
spritesheet_p.btnNewGame = function(){
	this.gotoAndPlay("btnNewGame");
}
spritesheet_p.overlay = function(){
	this.gotoAndPlay("overlay");
}
spritesheet_p.A = function(){
	this.gotoAndPlay("A");
}
spritesheet_p.B = function(){
	this.gotoAndPlay("B");
}
spritesheet_p.C = function(){
	this.gotoAndPlay("C");
}
spritesheet_p.D = function(){
	this.gotoAndPlay("D");
}
spritesheet_p.E = function(){
	this.gotoAndPlay("E");
}
spritesheet_p.F = function(){
	this.gotoAndPlay("F");
}
spritesheet_p.G = function(){
	this.gotoAndPlay("G");
}
spritesheet_p.H = function(){
	this.gotoAndPlay("H");
}
spritesheet_p.I = function(){
	this.gotoAndPlay("I");
}
spritesheet_p.J = function(){
	this.gotoAndPlay("J");
}
spritesheet_p.K = function(){
	this.gotoAndPlay("K");
}
spritesheet_p.L = function(){
	this.gotoAndPlay("L");
}
spritesheet_p.M = function(){
	this.gotoAndPlay("M");
}
spritesheet_p.N = function(){
	this.gotoAndPlay("N");
}
spritesheet_p.O = function(){
	this.gotoAndPlay("O");
}
spritesheet_p.P = function(){
	this.gotoAndPlay("P");
}
spritesheet_p.Q = function(){
	this.gotoAndPlay("Q");
}
spritesheet_p.R = function(){
	this.gotoAndPlay("R");
}
spritesheet_p.S = function(){
	this.gotoAndPlay("S");
}
spritesheet_p.T = function(){
	this.gotoAndPlay("T");
}
spritesheet_p.U = function(){
	this.gotoAndPlay("U");
}
spritesheet_p.V = function(){
	this.gotoAndPlay("V");
}
spritesheet_p.W = function(){
	this.gotoAndPlay("W");
}
spritesheet_p.X = function(){
	this.gotoAndPlay("X");
}
spritesheet_p.Y = function(){
	this.gotoAndPlay("Y");
}
spritesheet_p.Z = function(){
	this.gotoAndPlay("Z");
}
spritesheet_p.a = function(){
	this.gotoAndPlay("a");
}
spritesheet_p.b = function(){
	this.gotoAndPlay("b");
}
spritesheet_p.c = function(){
	this.gotoAndPlay("c");
}
spritesheet_p.d = function(){
	this.gotoAndPlay("d");
}
spritesheet_p.e = function(){
	this.gotoAndPlay("e");
}
spritesheet_p.f = function(){
	this.gotoAndPlay("f");
}
spritesheet_p.g = function(){
	this.gotoAndPlay("g");
}
spritesheet_p.h = function(){
	this.gotoAndPlay("h");
}
spritesheet_p.i = function(){
	this.gotoAndPlay("i");
}
spritesheet_p.j = function(){
	this.gotoAndPlay("j");
}
spritesheet_p.k = function(){
	this.gotoAndPlay("k");
}
spritesheet_p.l = function(){
	this.gotoAndPlay("l");
}
spritesheet_p.m = function(){
	this.gotoAndPlay("m");
}
spritesheet_p.n = function(){
	this.gotoAndPlay("n");
}
spritesheet_p.o = function(){
	this.gotoAndPlay("o");
}
spritesheet_p.p = function(){
	this.gotoAndPlay("p");
}
spritesheet_p.q = function(){
	this.gotoAndPlay("q");
}
spritesheet_p.r = function(){
	this.gotoAndPlay("r");
}
spritesheet_p.s = function(){
	this.gotoAndPlay("s");
}
spritesheet_p.t = function(){
	this.gotoAndPlay("t");
}
spritesheet_p.u = function(){
	this.gotoAndPlay("u");
}
spritesheet_p.v = function(){
	this.gotoAndPlay("v");
}
spritesheet_p.w = function(){
	this.gotoAndPlay("w");
}
spritesheet_p.x = function(){
	this.gotoAndPlay("x");
}
spritesheet_p.y = function(){
	this.gotoAndPlay("y");
}
spritesheet_p.z = function(){
	this.gotoAndPlay("z");
}
window.spritesheet = spritesheet;
}(window));


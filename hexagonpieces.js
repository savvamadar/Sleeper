var sideA = [0,2,1,2];
var sideB = [1,2,1.666,1];
var sideC = [1.666,1,1,0];
var sideD = [1,0,0,0];
var sideE = [0,0,-0.666,1];
var sideF = [-0.666,1,0,2];

var sideArr = [sideA,sideB,sideC,sideD,sideE,sideF];

function lerp_single(min, max, lerpAmount){
	return min+(lerpAmount*(max-min));
}

function lerp_single_inverse(min, max, value){
	return (value - min) / (max - min);
}

function lerp_side(minx, miny, maxx, maxy, lerpAmount){
	return [minx+(lerpAmount*(maxx-minx)), miny+(lerpAmount*(maxy-miny)), 1];
}

function HexagonPieces(shape_size, shard_amt, xRel, yRel){
	this.size = shape_size;
	this.amtPoints = shard_amt;
	this.selectedSides = [];
	for(var i =0;i<this.amtPoints; i++){
		this.selectedSides[i] = Math.floor(Math.random()*sideArr.length);
	}
	this.selectedSides.sort();
	this.selectedPointsA = [[0,2,0]];
	this.selectedPointsB = [[1,2,0]];
	this.selectedPointsC = [[1.666,1,0]];
	this.selectedPointsD = [[1,0,0]];
	this.selectedPointsE = [[0,0,0]];
	this.selectedPointsF = [[-0.666,1,0]];
	for(var i =0;i<this.amtPoints; i++){
		var currentSide = sideArr[this.selectedSides[i]];
		
		if(this.selectedSides[i]==0){
			this.selectedPointsA[this.selectedPointsA.length] = lerp_side(currentSide[0],currentSide[1],currentSide[2],currentSide[3],((Math.random()*0.96)+0.02));
		}
		else if(this.selectedSides[i]==1){
			this.selectedPointsB[this.selectedPointsB.length] = lerp_side(currentSide[0],currentSide[1],currentSide[2],currentSide[3],((Math.random()*0.96)+0.02));
		}
		else if(this.selectedSides[i]==2){
			this.selectedPointsC[this.selectedPointsC.length] = lerp_side(currentSide[0],currentSide[1],currentSide[2],currentSide[3],((Math.random()*0.96)+0.02));
		}
		else if(this.selectedSides[i]==3){
			this.selectedPointsD[this.selectedPointsD.length] = lerp_side(currentSide[0],currentSide[1],currentSide[2],currentSide[3],((Math.random()*0.96)+0.02));
		}
		else if(this.selectedSides[i]==4){
			this.selectedPointsE[this.selectedPointsE.length] = lerp_side(currentSide[0],currentSide[1],currentSide[2],currentSide[3],((Math.random()*0.96)+0.02));
		}
		else if(this.selectedSides[i]==5){
			this.selectedPointsF[this.selectedPointsF.length] = lerp_side(currentSide[0],currentSide[1],currentSide[2],currentSide[3],((Math.random()*0.96)+0.02));
		}
	}

	this.selectedPointsA.sort(function(x,y){
		if(x[0]<y[0]){
			return -1;
		}
		else if(x[0]>y[0]){
			return 1;
		}
		return 0;
	});
	this.selectedPointsB.sort(function(x,y){
		if(x[0]<y[0]){
			return -1;
		}
		else if(x[0]>y[0]){
			return 1;
		}
		return 0;
	});
	this.selectedPointsF.sort(function(x,y){
		if(x[0]<y[0]){
			return -1;
		}
		else if(x[0]>y[0]){
			return 1;
		}
		return 0;
	});
	this.selectedPointsC.sort(function(x,y){
		if(x[0]<y[0]){
			return 1;
		}
		else if(x[0]>y[0]){
			return -1;
		}
		return 0;
	});
	this.selectedPointsD.sort(function(x,y){
		if(x[0]<y[0]){
			return 1;
		}
		else if(x[0]>y[0]){
			return -1;
		}
		return 0;
	});
	this.selectedPointsE.sort(function(x,y){
		if(x[0]<y[0]){
			return 1;
		}
		else if(x[0]>y[0]){
			return -1;
		}
		return 0;
	});
	var allPoints = [];
	allPoints = allPoints.concat(this.selectedPointsA);
	allPoints = allPoints.concat(this.selectedPointsB);
	allPoints = allPoints.concat(this.selectedPointsC);
	allPoints = allPoints.concat(this.selectedPointsD);
	allPoints = allPoints.concat(this.selectedPointsE);
	allPoints = allPoints.concat(this.selectedPointsF);

	var startPoint = 0;
	for(var i=0;i<allPoints.length;i++){
		if(allPoints[i][2]==1){
			startPoint = i;
			i = allPoints.length;
		}
	}
	
	var currentShardPath = "";
	this.shards = [];
	var newShard = true;
	var hasPrevPoint = false;
	for(var i=startPoint; i <=(allPoints.length+startPoint);i++){
		if(i<allPoints.length){
			if(allPoints[i][2]==0){
				if(newShard){
					currentShardPath = (allPoints[i][0]*this.size)+" "+(allPoints[i][1]*this.size);
					newShard = false;
				}
				else{
					currentShardPath += " "+(allPoints[i][0]*this.size)+" "+(allPoints[i][1]*this.size);
				}
			}
			else{
				if(newShard){
					currentShardPath = (allPoints[i][0]*this.size)+" "+(allPoints[i][1]*this.size);
					newShard = false;
				}
				else{
					currentShardPath += " "+(allPoints[i][0]*this.size)+" "+(allPoints[i][1]*this.size);
				}
				if(hasPrevPoint == true){
					currentShardPath += " "+(lerp_single(-0.666,1.666,xRel)*this.size)+" "+(lerp_single(0,2,yRel)*this.size);
					this.shards[this.shards.length] = currentShardPath;
					i=i-1;
					hasPrevPoint = false;
					newShard = true;
				}
				else{
					hasPrevPoint = true;
				}
			}
		}
		else{
			var t = i-allPoints.length;
			if(allPoints[t][2]==0){
				if(newShard){
					currentShardPath = (allPoints[t][0]*this.size)+" "+(allPoints[t][1]*this.size);
					newShard = false;
				}
				else{
					currentShardPath += " "+(allPoints[t][0]*this.size)+" "+(allPoints[t][1]*this.size);
				}
			}
			else{
				if(newShard){
					currentShardPath = (allPoints[t][0]*this.size)+" "+(allPoints[t][1]*this.size);
					newShard = false;
				}
				else{
					currentShardPath += " "+(allPoints[t][0]*this.size)+" "+(allPoints[t][1]*this.size);
				}
				if(hasPrevPoint == true){
					currentShardPath += " "+(lerp_single(-0.666,1.666,xRel)*this.size)+" "+(lerp_single(0,2,yRel)*this.size);
					this.shards[this.shards.length] = currentShardPath;
					i=i-1;
					hasPrevPoint = false;
					newShard = true;
				}
				else{
					hasPrevPoint = true;
				}
			}
		}
	}
}
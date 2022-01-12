
class MinTimeAsync {
	public timer;
	public minTimeWaited: boolean = false;
	public response: boolean = false;
	public error: boolean = false;

	public minTime: number;
	public fn;
	public onError;
	public onSuccess;
	public loadStart;


	constructor({minTime, fn, onError, onSuccess, loadStart}) {

		this.fn = fn;
		this.onError = onError;
		this.onSuccess = onSuccess;
		this.loadStart = loadStart;

		// Set min. time for showing loader
		this.timer = setTimeout(()=>{
			this.minTimeWaited = true;
			if(!this.response && !this.error) return
		
			if(this.error){
				onError()
			} else if(this.response){
				onSuccess()
			}
		},minTime)
		this.excecute();


	}

	async excecute(){
		try{
			this.loadStart()
			
			this.response = !!await this.fn()
			
			
			if(this.error){
				this.onError();
			} else{
				this.onSuccess()
			}
			
		} catch(err){
			
			// Error message
			console.log(err)
			this.error = true;
			if(this.minTimeWaited){
				this.onError()
			} 
		
		}
	}

}

export default MinTimeAsync;

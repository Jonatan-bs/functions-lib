/**
 *
 * Set minimum time on async functions
 *
 * @param minTime <number> minimum time before finisf
 * @param fn <function> async function
 * @param onError <function> what to do on error
 * @param onSuccess <function> what to do on success. has response param
 * @param loadStart <function> what to do while loading. has error param
 * 
 */

class MinTimeAsync {
	public timer;
	public minTimeWaited: boolean = false;
	public response;
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
				onError(this.error)
			} else if(this.response){
				onSuccess(this.response)
			}
		},minTime)
		this.excecute();


	}

	async excecute(){
		try{
			this.loadStart()
			
			this.response = await this.fn()
			
			
			if(this.error){
				this.onError(this.error);
			} else{
				this.onSuccess(this.response)
			}
			
		} catch(err){
			
			this.error = err;
			if(this.minTimeWaited){
				this.onError(this.error)
			} 
		
		}
	}

}

export default MinTimeAsync;

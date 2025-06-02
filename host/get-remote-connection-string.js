module.exports = (url, remoteName) => {
	return `promise new Promise(function (resolve, reject) {
					var __webpack_error__ = new Error()
					if (typeof window["${remoteName}"] !== 'undefined') return resolve();
					__webpack_require__.l(
						"${url}/remoteEntry.js",
						function (event) {
							if (typeof ${remoteName} !== 'undefined') return resolve();
							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
							var realSrc = event && event.target && event.target.src;
							__webpack_error__.message =
								'Loading script failed.\\n(' + errorType + ': ' + realSrc + ')';
							__webpack_error__.name = 'ScriptExternalLoadError';
							__webpack_error__.type = errorType;
							__webpack_error__.request = realSrc;
							reject(__webpack_error__);
						},
						"${remoteName}",
					);
				}).then(function(){
					var proxy = {
						get: ${remoteName}.get,
						init: ${remoteName}.init
					}
					return proxy
				}).catch(function(e) {
					console.log('remote ${remoteName} is not available');
					let newProxy = {
						get: (module, scope) => () => undefined,
						init: () => {}
					}
					return(newProxy);
				})`;
};

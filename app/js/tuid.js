/* Copyright 2014 Rishi Sharma
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

if (!window['getXMLHttpRequest']) {
  // Copied from MochiKit/Async.js
  function getXMLHttpRequest() {
    var self = arguments.callee;
    if (!self.XMLHttpRequest) {
      var tryThese = [
        function () { return new XMLHttpRequest(); },
        function () { return new ActiveXObject('Msxml2.XMLHTTP'); },
        function () { return new ActiveXObject('Microsoft.XMLHTTP'); },
        function () { return new ActiveXObject('Msxml2.XMLHTTP.4.0'); },
        function () { return null; }
      ];
      for (var i = 0; i < tryThese.length; i++) {
        var func = tryThese[i];
        try {
          self.XMLHttpRequest = func;
          return func();
        } catch (e) {
            // pass
        }
      }
    }
    return self.XMLHttpRequest();
  }
}

function tuid(cb){
  var tuid;
  var client = getXMLHttpRequest();
  client.open("PUT", "https://tuid.s3.amazonaws.com/lock/file");
  client.setRequestHeader("x-amz-storage-class", "REDUCED_REDUNDANCY");
  client.setRequestHeader("x-amz-counter", Math.random().toString())
  client.onreadystatechange = function(){
    if ( client.readyState === 4 && client.status === 200 ) {
      var versionId = client.getResponseHeader("x-amz-version-id");
      if ( versionId ) { 
        tuid = versionId + new Date().getTime();
      }
      cb(tuid);
    }
  };
  client.send(null);
  return client;
};
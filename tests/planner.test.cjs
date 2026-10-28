const { test } = require('node:test');
const assert = require('node:assert/strict');
const { generatePlan, validateRequest, validatePlan } = require('../planner');
const request = { date:'2026-10-28',brief:'Study arrays',start:'09:00',end:'12:00',energy:'balanced',focusMinutes:50,commitments:[{name:'Meeting',start:'10:00',end:'10:30'}],goals:[] };
const block = {name:'Study',desc:'Practice arrays',start:'09:00',end:'09:50',category:'learning'};
const plan = {summary:'A focused morning',blocks:[block],unscheduled:[]};

test('planner rejects impossible dates and invalid time ranges', () => {
  assert.throws(()=>validateRequest({...request,date:'2026-02-30'}));
  assert.throws(()=>validateRequest({...request,end:'08:00'}));
  assert.throws(()=>validateRequest({...request,start:'25:00'}));
});
test('planner validates commitments, categories, bounds, and overlapping new blocks', () => {
  assert.throws(()=>validatePlan({...plan,blocks:[{...block,start:'09:50',end:'10:10'}]},request));
  assert.throws(()=>validatePlan({...plan,blocks:[block,{...block,start:'09:30'}]},request));
  assert.throws(()=>validatePlan({...plan,blocks:[{...block,start:'08:00'}]},request));
  assert.throws(()=>validatePlan({...plan,blocks:[{...block,category:'unknown'}]},request));
  assert.equal(validatePlan(plan,request).blocks.length,1);
});
test('missing configuration does not call an AI provider', async () => {
  await assert.rejects(generatePlan(request,{env:{},fetchImpl:()=>{throw new Error('Should not call')}}), /not connected/);
});
test('Gemini response is parsed, validated and secrets are sent only as a header', async () => {
  let payload;
  const output=await generatePlan(request,{env:{GEMINI_API_KEY:'test-only-key'},fetchImpl:async(url,options)=>{
    assert.ok(!url.includes('test-only-key')); assert.equal(options.headers['x-goog-api-key'],'test-only-key');
    payload=JSON.parse(options.body);
    return {ok:true,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(plan)}]}}]})};
  }});
  assert.equal(payload.generationConfig.responseMimeType,'application/json');
  assert.equal(output.provider,'Gemini');
  assert.equal(output.blocks[0].start,'09:00');
});
test('quota errors and truncated AI responses do not produce an accepted plan', async () => {
  const env={GEMINI_API_KEY:'test-only-key'};
  await assert.rejects(generatePlan(request,{env,fetchImpl:async()=>({ok:false,status:429})}), /usage limit/);
  await assert.rejects(generatePlan(request,{env,fetchImpl:async()=>({ok:true,json:async()=>({candidates:[{finishReason:'MAX_TOKENS'}]})})}), /complete schedule/);
});

test('planner accepts optional context and bounds it before sending to Gemini', () => {
  assert.equal(validateRequest({...request,context:' Beginner in arrays '}).context,'Beginner in arrays');
  assert.equal(validateRequest(request).context,'');
  assert.throws(()=>validateRequest({...request,context:'x'.repeat(501)}), /context/);
});

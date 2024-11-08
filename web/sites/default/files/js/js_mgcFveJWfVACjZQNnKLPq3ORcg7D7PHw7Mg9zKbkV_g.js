/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function($,Drupal,once){'use strict';Drupal.webform=Drupal.webform||{};Drupal.webform.elementHelpIcon=Drupal.webform.elementHelpIcon||{};Drupal.webform.elementHelpIcon.options=Drupal.webform.elementHelpIcon.options||{};Drupal.behaviors.webformElementHelpIcon={attach:function(context){if(!window.tippy)return;var hideOnEsc={name:'hideOnEsc',defaultValue:true,fn:function fn(_ref){var hide=_ref.hide;function onKeyDown(event){if(event.keyCode===27)hide();}return {onShow:function onShow(){document.addEventListener('keydown',onKeyDown);},onHide:function onHide(){document.removeEventListener('keydown',onKeyDown);}};}};$(once('webform-element-help','.js-webform-element-help',context)).each(function(){var $link=$(this);$link.on('click',function(event){event.preventDefault();});var options=$.extend({content:$link.attr('data-webform-help'),delay:100,allowHTML:true,interactive:true,plugins:[hideOnEsc]},Drupal.webform.elementHelpIcon.options);tippy(this,options);});}};})(jQuery,Drupal,once);;
(function($,Drupal,once){'use strict';function toggleOther(show,$element,effect){var $input=$element.find('input');var hideEffect=(effect===false)?'hide':'slideUp';var showEffect=(effect===false)?'show':'slideDown';if(show){var width=$element.parent().width();if(width)$element.width(width);$element[showEffect]();if(effect!==false)$input.trigger('focus');$input.prop('required',true).attr('aria-required','true');var value=$input.data('webform-value');if(typeof value!=='undefined'){$input.val(value);var input=$input.get(0);if($.inArray(input.type,['text','search','url','tel','password'])!==-1)input.setSelectionRange(0,0);}$element.parent().find('.CodeMirror').each(function(index,$element){$element.CodeMirror.refresh();});}else{$element[hideEffect]();if($input.val()!=='')$input.data('webform-value',$input.val());$input.val('').prop('required',false).removeAttr('aria-required');}}Drupal.behaviors.webformSelectOther={attach:function(context){$(once('webform-select-other','.js-webform-select-other',context)).each(function(){var $element=$(this);var $select=$element.find('select');var $input=$element.find('.js-webform-select-other-input');$select.on('change',function(){var isOtherSelected=$select.find('option[value="_other_"]').is(':selected');toggleOther(isOtherSelected,$input);});var isOtherSelected=$select.find('option[value="_other_"]').is(':selected');toggleOther(isOtherSelected,$input,false);});}};Drupal.behaviors.webformCheckboxesOther={attach:function(context){$(once('webform-checkboxes-other','.js-webform-checkboxes-other',context)).each(function(){var $element=$(this);var $checkbox=$element.find('input[value="_other_"]');var $input=$element.find('.js-webform-checkboxes-other-input');$checkbox.on('change',function(){toggleOther(this.checked,$input);});toggleOther($checkbox.is(':checked'),$input,false);});}};Drupal.behaviors.webformRadiosOther={attach:function(context){$(once('webform-radios-other','.js-webform-radios-other',context)).each(function(){var $element=$(this);var $radios=$element.find('input[type="radio"]');var $input=$element.find('.js-webform-radios-other-input');$radios.on('change',function(){toggleOther(($radios.filter(':checked').val()==='_other_'),$input);});toggleOther(($radios.filter(':checked').val()==='_other_'),$input,false);});}};Drupal.behaviors.webformButtonsOther={attach:function(context){$(once('webform-buttons-other','.js-webform-buttons-other',context)).each(function(){var $element=$(this);var $buttons=$element.find('input[type="radio"]');var $input=$element.find('.js-webform-buttons-other-input');var $container=$(this).find('.js-webform-webform-buttons');$container.on('change',function(){toggleOther(($(this).find(':radio:checked').val()==='_other_'),$input);});toggleOther(($buttons.filter(':checked').val()==='_other_'),$input,false);});}};})(jQuery,Drupal,once);;
(function($,Drupal,once){'use strict';var hasLocalStorage=(function(){try{localStorage.setItem('webform','webform');localStorage.removeItem('webform');return true;}catch(e){return false;}}());var hasSessionStorage=(function(){try{sessionStorage.setItem('webform','webform');sessionStorage.removeItem('webform');return true;}catch(e){return false;}}());Drupal.behaviors.webformMessageClose={attach:function(context){$(once('webform-message--close','.js-webform-message--close',context)).each(function(){var $element=$(this);var id=$element.attr('data-message-id');var storage=$element.attr('data-message-storage');var effect=$element.attr('data-message-close-effect')||'hide';switch(effect){case 'slide':effect='slideUp';break;case 'fade':effect='fadeOut';break;}if(isClosed($element,storage,id))return;if($element.attr('style')!=='display: none;'&&!$element.hasClass('js-webform-states-hidden'))$element.show();$element.find('.js-webform-message__link').on('click',function(event){$element[effect]();setClosed($element,storage,id);$element.trigger('close');event.preventDefault();});});}};function isClosed($element,storage,id){if(!id||!storage)return false;switch(storage){case 'local':if(hasLocalStorage)return localStorage.getItem('Drupal.webform.message.'+id)||false;return false;case 'session':if(hasSessionStorage)return sessionStorage.getItem('Drupal.webform.message.'+id)||false;return false;default:return false;}}function setClosed($element,storage,id){if(!id||!storage)return;switch(storage){case 'local':if(hasLocalStorage)localStorage.setItem('Drupal.webform.message.'+id,true);break;case 'session':if(hasSessionStorage)sessionStorage.setItem('Drupal.webform.message.'+id,true);break;case 'user':case 'state':case 'custom':$.get($element.find('.js-webform-message__link').attr('href'));return true;}}})(jQuery,Drupal,once);;
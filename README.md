BlockQuote Break plugin for Redactor
================

Redactor plugin to break blockquote (like gmail)

## Requirements 
* jQuery 1.9.0 or later
* Redactor 9

## How to use it?
Call it in `plugins` option like this:
```
$('#redactor').redactor({
        plugins: ['blockquote_break']
});
```

## What is does?
Converts this

```
<body>                                           
 <blockquote>                                   
  This is a comment which has been quoted.
    Try it :-) !                                 
  </blockquote>                                  
 </body>                                     
 ```
to 

 ```
<body>                                           
 <blockquote>                                   
  This is a comment which has been quoted.
</blockquote>
<br>
 <blockquote>                                    
    Try it :-) !                                 
 </blockquote>                                  
 </body>                                     
 ```

## The MIT License (MIT)

Copyright (c) 2013 Bilal Budhani
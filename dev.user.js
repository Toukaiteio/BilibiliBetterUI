// ==UserScript==
// @name         BetterUI
// @namespace    http://tampermonkey.net/
// @version      0.1.3.2
// @description  优化b站
// @author       Daiyosei
// @copyright    2024, Daiyosei (https://github.com/Toukaiteio)
// @match        https://*.bilibili.com
// @match        https://*.bilibili.com/*
// @match        https://*.bilibili.com/*/*
// @homepageURL     https://github.com/Toukaiteio/BilibiliBetterUI
// @supportURL      https://github.com/Toukaiteio/BilibiliBetterUI/issues
// @downloadURL     https://raw.githubusercontent.com/Toukaiteio/BilibiliBetterUI/master/release/BetterUI.min.user.js
// @updateURL       https://raw.githubusercontent.com/Toukaiteio/BilibiliBetterUI/master/release/BetterUI.min.user.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-end
// ==/UserScript==
const HomeICON = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z"></path></svg>`;
const HomeICON_Active = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><g><path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"></path></g></svg>`;
const AnimeICON = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path></svg>`;
const AnimeICON_Active = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path d="M20 7H4V6h16v1zm2 2v12H2V9h20zm-7 6-5-3v6l5-3zm2-12H7v1h10V3z"></path></svg>`;
const GameICON = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path></svg>`;
const GameICON_Active = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path d="m17.77 10.32-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.65v-5.3L15 12l-5 2.65z"></path></svg>`;
const ArrowICON = `<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 16 16" width="16" focusable="false" style="pointer-events: none; display: block;"><path d="M4.97 12.65 9.62 8 4.97 3.35l.71-.71L11.03 8l-5.35 5.35-.71-.7z"></path></svg>`;
const MainLogoICON = `<svg t="1626764977164" viewBox="0 0 2240 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4404" xmlns:xlink="http://www.w3.org/1999/xlink" width="140" height="64"><path d="M2079.810048 913.566175c-10.01309 0-18.554608 0.799768-26.936172-0.159954-16.987063-1.951433-33.974126-1.567544-50.99318-2.079395-10.972811-0.287916-10.652904-0.287916-11.580634-10.90883-2.71921-32.406582-5.694345-64.781173-8.605499-97.155764-2.527266-28.439735-4.926568-56.91146-7.70976-85.319204-2.527266-26.040432-5.566382-52.016883-8.317583-78.025324-2.623238-24.440897-5.054531-48.913784-7.77374-73.322691a12681.114551 12681.114551 0 0 0-10.684895-92.133223c-3.295042-27.128116-6.558094-54.320213-10.205034-81.416339a20559.272961 20559.272961 0 0 0-17.530905-125.979387c-6.398141-44.723002-14.075909-89.22207-22.105576-133.657156-1.439582-7.965685-1.247637-8.253601 6.36615-9.533229 31.670796-5.406429 63.501545-10.01309 95.716183-9.309295 3.486987 0.095972 7.005964 0.159954 10.460959 0.607823 5.662354 0.703795 8.605499 3.454996 8.925406 10.045081 1.119675 22.969325 2.71921 45.938649 4.414717 68.875983 2.71921 37.589076 5.662354 75.178151 8.477537 112.735236 1.791479 24.184971 3.327033 48.305961 5.150503 72.426951 2.911154 38.772732 5.982261 77.513473 8.925406 116.286205 1.791479 23.705111 3.359024 47.474203 5.182494 71.179313 2.783191 34.805885 5.822308 69.579778 8.637489 104.353672 1.791479 22.137566 3.391014 44.307123 5.278466 66.44469 2.783191 32.79047 5.790317 65.580941 8.63749 98.371411 2.143377 25.592562 4.09481 51.249106 6.270178 77.673426zM853.670395 114.918282c4.638652 0 11.644616-0.511851 18.554607 0.127963 8.797443 0.799768 10.49295 3.071107 11.036793 11.900541 2.527266 40.372267 4.894578 80.776524 7.581796 121.180782 2.943145 43.571337 6.174206 87.078693 9.405267 130.586048 2.975135 39.956388 5.950271 79.912775 9.149341 119.869163 3.486987 43.891244 7.357862 87.718507 10.876839 131.609751 2.655228 33.622229 4.926568 67.244457 7.677768 100.898677 2.623238 31.222926 5.694345 62.38187 8.509527 93.572805 2.399303 26.8402 4.830596 53.71239 7.165918 80.58458 0.735786 8.509527 0.127963 9.053369-9.053369 8.829434-24.025018-0.575833-47.922073-3.391014-71.947091-2.71921-5.502401 0.159954-7.101936-2.367312-8.029666-7.581796-1.983424-11.356699-1.663517-22.905343-2.879163-34.390006-3.295042-30.359177-5.182494-60.846317-7.965685-91.269474-2.495275-27.639967-5.502401-55.215953-8.349574-82.82393-2.527266-25.240664-5.02254-50.481329-7.709759-75.753984-2.687219-24.792795-5.534392-49.61758-8.349573-74.442365-2.591247-22.841362-5.118512-45.682723-7.869713-68.524085-4.062819-33.462275-8.093648-66.92455-12.508365-100.322844-4.062819-30.647093-8.66948-61.198214-12.988225-91.813317-5.886289-41.587914-12.508365-83.079855-19.834236-124.411842a1393.96288 1393.96288 0 0 0-5.310457-28.023856c-0.959721-4.702633-0.095972-7.421843 5.278466-8.157629 14.139891-1.887451 28.24779-4.830596 42.451663-6.206196 14.203872-1.311619 28.407744-3.966847 45.106891-2.71921z m1006.075609 403.33878c27.064134 0 27.703949 0.191944 32.054684 24.536869 5.342447 30.03927 9.08536 60.334465 12.636328 90.62966 3.742912 32.278619 7.517815 64.557238 10.972811 96.867848 2.783191 26.008441 5.118512 52.080864 7.74175 78.089305 2.7512 27.256079 5.662354 54.416185 8.509527 81.640274 1.567544 15.387528 3.039117 30.775056 4.798605 46.130593 0.511851 4.446708-0.831758 6.81402-5.214485 7.325871-9.245313 1.055693-18.426645 2.27134-27.639967 3.263052-16.891091 1.82347-33.814173 3.614949-50.737254 5.182493-8.733462 0.799768-9.309294 0.319907-10.940821-8.125638-14.843686-76.617733-29.719363-153.171485-44.435086-229.821208-9.789155-50.961189-19.322384-101.95437-28.919595-152.915559a805.525894 805.525894 0 0 1-3.582959-21.081873c-0.639814-4.030829 0.44787-6.622075 5.022541-7.70976 30.48714-7.133927 61.294186-12.636328 89.733921-14.011927z m-1137.077537 0c28.951586 0 28.823623 0.095972 33.302322 26.360339 6.909992 40.660183 11.804569 81.544301 16.187295 122.556382 4.286754 39.796434 8.957397 79.560878 13.148179 119.357311 2.847173 27.224088 5.086522 54.512157 7.74175 81.704255 1.887451 19.354375 4.126801 38.644769 6.174206 57.967153 0.255926 2.367312 0.383888 4.734624 0.543842 7.133927 0.415879 9.469248 0 10.237025-9.117351 11.164755-18.074747 1.887451-36.181485 3.454996-54.256232 5.246476-6.558094 0.639814-13.084197 1.599535-19.57831 2.239349-8.63749 0.799768-8.925406 0.767777-10.620913-7.965685-6.078234-30.679084-11.964523-61.422149-17.914793-92.101233-14.267853-73.898523-28.69566-147.733065-42.867542-221.631589-5.662354-29.559409-10.524941-59.246781-16.091323-88.838181-1.023702-5.406429-0.255926-7.933694 5.342447-9.245313 30.199223-7.037955 60.590391-12.540355 88.006423-13.947946z m382.128944 309.861946v124.027954c0 1.183656-0.127963 2.399303 0.03199 3.582959 0.607823 6.014252-1.599535 8.66948-7.805731 8.413555-8.157629-0.351898-16.251277-0.127963-24.408906 0.063981-17.019054 0.319907-34.070098-0.351898-51.057162 1.599535-9.405267 1.087684-9.213322 0.511851-10.141052-9.405266-2.783191-31.222926-5.822308-62.413861-8.669481-93.636787-2.623238-28.823623-4.99055-57.711228-7.677768-86.534851-2.71921-29.655381-5.758326-59.214791-8.509527-88.838181-1.887451-19.770254-3.550968-39.508518-5.214485-59.278772-2.175368-25.720525-4.190782-51.409059-6.462122-77.129585-0.959721-10.844848-0.159954-12.380402 10.588923-13.500076a531.877423 531.877423 0 0 1 83.527724-2.591247c6.941982 0.383888 13.851974 1.727498 20.570022 3.359024 8.477536 2.015414 9.405267 3.263052 9.853137 12.124476 0.92773 17.850812 1.855461 35.701624 2.335321 53.584427 0.543842 19.866226 0.095972 39.764443 0.831758 59.63067 1.855461 54.800074 1.567544 109.664129 2.207359 164.528184z m1134.806197 5.630364v117.437869c0 1.983424-0.063981 3.966847 0.03199 5.982262 0.415879 5.150503-1.983424 6.973973-6.878001 6.941982-12.028504-0.095972-24.025018 0-36.021531 0.159954-13.564058 0.127963-27.096125 0.063981-40.628192 1.535553-8.925406 1.023702-8.989387 0.351898-9.789155-8.509527-3.678931-40.660183-7.549806-81.320366-11.260728-122.04453-3.391014-37.525094-6.526103-75.082179-9.981099-112.639265-3.550968-38.740741-7.421843-77.38551-10.90883-116.09426-1.727498-19.386366-3.16708-38.772732-4.606661-58.159097-0.575833-8.445546 0.351898-9.949109 9.885127-10.716886 16.571184-1.311619 33.078387-3.550968 49.777534-3.263051 16.635165 0.319907 33.302322-0.607823 49.841515 2.559256 14.011928 2.687219 14.715723 3.486987 15.547481 18.458635 2.399303 44.051198 1.663517 88.230358 3.231061 132.281556 1.599535 46.89837 0.479861 93.79674 1.759489 146.069549zM1831.498213 305.135c9.789155 0.575833 17.498914 0.095972 25.176683 1.791479 4.894578 1.119675 7.357862 3.327033 7.837723 8.573509 2.303331 25.240664 4.798605 50.51332 7.32587 75.785975 2.015414 20.50604 4.158791 41.012081 6.238188 61.518121l0.191944 1.183656c1.663517 12.924244 1.279628 13.276142-11.292718 13.979937-11.196746 0.607823-22.361501 1.599535-33.558247 2.27134-7.357862 0.44787-9.693183 1.695507-10.90883-9.021378-4.190782-37.813011-9.053369-75.530049-13.692021-113.311069a1185.0316 1185.0316 0 0 0-4.286754-31.798759c-0.92773-5.982261 1.407591-9.277304 7.005964-9.757164 7.357862-0.671805 14.715723-0.863749 19.962198-1.215647z m-1133.398606 0.159954c7.549806 0.415879 15.323547-0.159954 22.937334 1.599535 4.350736 0.991712 6.558094 2.815182 6.973973 7.773741 0.92773 11.83656 2.7512 23.641129 3.870875 35.477689 3.550968 36.309448 6.909992 72.650886 10.237025 108.992324 0.703795 7.901704 0.543842 8.061657-6.84601 8.605499-13.116188 0.959721-26.264367 1.919442-39.412546 2.463284-7.645778 0.351898-8.605499-0.575833-9.56522-8.381564-3.327033-26.744227-6.462122-53.520446-9.661192-80.296664-2.591247-22.073585-4.766615-44.14717-7.901704-66.156773-0.863749-6.078234 1.119675-7.74175 5.982262-8.733462 7.709759-1.567544 15.451509-1.055693 23.385203-1.343609z m399.147998 100.002936c0 23.001315 0.063981 45.97064-0.031991 69.003946 0 10.332997-0.127963 10.396978-10.396978 10.269016a324.289753 324.289753 0 0 1-36.981252-1.919443c-7.933694-0.991712-8.093648-0.735786-8.317583-9.149341-0.799768-28.119828-1.631526-56.239655-2.207359-84.359483-0.415879-19.034468-0.639814-38.004955-1.791479-57.039422-0.607823-9.821146-0.063981-9.917118 9.373276-10.045081 13.915956-0.159954 27.799921 0.479861 41.619904 2.591247 8.317583 1.279628 8.701471 1.279628 8.733462 10.49295 0.063981 23.385204 0.063981 46.770407 0.063981 70.187602h-0.063981z m1135.38203 0.607824c0 23.033306 0.063981 46.034621-0.031991 69.035936 0 9.661192-0.159954 9.725174-9.853137 9.661192a505.32514 505.32514 0 0 1-38.132917-1.791479c-6.302168-0.479861-8.157629-3.135089-7.74175-8.861425 0.063981-0.799768 0-1.599535 0-2.399302-0.959721-44.403095-1.919442-88.7742-2.815182-133.177296-0.031991-2.367312-0.159954-4.734624-0.063982-7.133926 0.127963-8.957397 0.159954-9.181332 9.149341-9.117351 12.380402 0.063981 24.664832 0.703795 37.013243 1.919442 15.067621 1.503563 12.412393 3.359024 12.476375 15.259566 0.063981 22.169557 0.031991 44.403095 0 66.604643z m-1565.593 54.000306c0.287916 12.636328 0.287916 12.604337-11.804569 15.547481-8.221611 2.015414-16.443221 4.222773-24.728813 6.046243-7.069945 1.599535-8.317583 0.703795-9.53323-6.238187-8.445546-47.090314-16.8591-94.212619-25.240664-141.334924-1.695507-9.757164-1.247637-10.364988 8.349573-12.060495 11.804569-2.079396 23.577148-4.126801 35.381717-5.950271 7.517815-1.183656 8.477536-0.767777 9.9811 7.517815 2.975135 16.731138 5.790317 33.526256 7.997675 50.385357 3.423005 26.680246 6.238187 53.456464 9.309295 80.168701 0.255926 1.951433 0.191944 3.966847 0.287916 5.91828z m1064.138735-136.696273c15.451509-2.527266 31.030982-5.086522 46.610454-7.549806 5.598373-0.863749 7.29388 2.655228 8.029666 7.645778 2.655228 18.426645 5.982261 36.725327 8.157629 55.183962 3.19907 26.744227 7.581797 53.360492 8.413555 80.328655 0.063981 2.7512 0.031991 5.566382 0.095972 8.317583 0.159954 4.286754-1.983424 6.494113-5.950271 7.421843-10.556932 2.367312-21.113864 4.734624-31.638805 7.261889-5.054531 1.215647-6.750038-0.92773-7.581796-5.854298-3.16708-18.746552-6.81402-37.397131-10.045081-56.079702-5.47041-30.775056-10.780867-61.582103-16.091323-92.38915-0.127963-1.119675 0-2.303331 0-4.286754z m-710.64147 108.032603c-0.44787 16.37924 0.543842 30.647093-1.695507 44.914947-0.671805 4.510689-1.983424 7.421843-6.846011 7.837722-10.428969 0.863749-20.825947 1.695507-31.190935 2.7512-5.02254 0.543842-6.430131-1.631526-7.261889-6.558094-2.335321-14.55577-1.919442-29.303484-3.327033-43.923234-2.655228-27.607976-3.774903-55.407897-5.566383-83.111846-0.44787-6.750038-1.119675-13.436095-1.663516-20.186134-0.287916-3.774903 1.215647-5.886289 5.246475-6.046242 13.500077-0.543842 26.936172-3.007126 40.50023-2.527266 7.933694 0.287916 8.605499 0.799768 9.181331 8.797443 0.351898 5.534392 0.255926 11.132765 0.383889 16.699147l2.239349 81.352357z m1134.902169-15.867388c0 19.066459 0.223935 38.132918-0.031991 57.199376-0.159954 9.917118-1.279628 10.780867-10.652904 11.644616-9.277304 0.863749-18.490626 1.567544-27.735939 2.559256-5.214485 0.543842-7.645778-0.991712-7.965685-6.973973-1.34361-25.336637-3.16708-50.673273-4.926568-75.977919-1.3756-20.985901-2.943145-41.939811-4.414717-62.893722-0.159954-2.399303-0.031991-4.798605-0.191944-7.165917-0.223935-4.190782 1.055693-6.654066 5.758326-6.81402 13.116188-0.44787 26.136404-2.975135 39.348564-2.495274 8.061657 0.287916 8.18962 0.415879 8.797444 8.797443 1.951433 27.32006 2.143377 54.704102 2.015414 82.120134zM628.295894 756.171918c16.571184 18.234701 17.402942 39.828425 11.932532 62.413861-5.502401 22.585436-18.042756 41.204025-33.23834 57.903171-25.49659 27.895893-56.303637 48.497905-89.062116 65.99682-56.399609 30.135242-116.190232 50.161422-178.572103 61.997982-44.882956 8.477536-90.053828 15.00364-135.704561 17.498914-13.915956 0.767777-27.799921 1.407591-41.715876 1.311619-10.077071 0-20.186133 0.287916-30.231214-0.063981-8.541518-0.319907-9.789155-1.791479-10.49295-10.716886-2.591247-32.022693-4.798605-64.077378-7.645778-96.100071-3.327033-37.109215-7.229899-74.18644-10.812858-111.295654-2.623238-26.8402-4.894578-53.744381-7.773741-80.520599-3.327033-31.542833-7.069945-63.021684-10.716885-94.564517-3.327033-29.111539-6.526103-58.28706-10.045081-87.430591-3.934856-32.278619-7.997676-64.493257-12.31642-96.707894a8228.968456 8228.968456 0 0 0-13.212161-92.996973 5984.500754 5984.500754 0 0 0-24.312934-152.627642 3243.825263 3243.825263 0 0 0-23.67312-123.740038c-1.151665-5.502401 0.511851-7.709759 5.342448-9.725174C52.335283 47.609843 98.465876 28.063524 144.724432 8.77313c8.605499-3.582959 17.434933-6.590085 26.584274-8.285592 6.334159-1.183656 7.965685 0.127963 7.773741 6.494113-0.479861 16.283268 0.191944 32.630517-1.407591 48.849803a161.393095 161.393095 0 0 0-0.639814 13.084197c-0.735786 58.383032-1.439582 116.798056 0.095972 175.213079 1.34361 51.185124 4.030829 102.338258 7.005964 153.491392 2.335321 40.372267 5.694345 80.744534 9.149341 121.052819 3.391014 39.508518 7.517815 78.953054 11.38869 118.461572 0.735786 7.517815 1.407591 8.221611 9.949108 7.069945a381.329176 381.329176 0 0 1 50.833227-4.190782c52.880632-0.127963 104.897514 7.133927 156.338564 19.322384 45.010919 10.684895 88.806191 24.920757 130.777993 44.818975 20.793957 9.853136 40.692174 21.241827 58.830902 35.701624 6.174206 4.862587 11.676606 10.46096 16.891091 16.315259z m1126.840512-9.597211c20.47405 17.946784 27.927883 39.924397 22.105576 67.116494-4.830596 22.425483-15.771416 41.268006-30.359177 58.127107-23.417194 27.096125-51.856929 47.698138-82.631985 64.909136-60.334465 33.782182-124.603787 55.727804-192.168151 68.396122a1151.089465 1151.089465 0 0 1-111.455609 15.547481c-21.177845 1.82347-42.451662 4.09481-66.220754 2.623238h-27.76793c-5.406429 0-8.477536-1.695507-8.925406-8.125638-2.047405-28.087837-4.414717-56.143683-6.941983-84.19953-2.687219-29.623391-5.662354-59.246781-8.477536-88.870172-2.559256-27.224088-4.926568-54.512157-7.709759-81.736245-2.559256-25.656544-5.502401-51.249106-8.285592-76.873659-2.591247-24.057008-5.086522-48.114017-7.933695-72.139035-3.423005-29.111539-7.037955-58.223079-10.652904-87.334618-3.391014-27.160107-6.750038-54.288222-10.364987-81.416338a6133.577429 6133.577429 0 0 0-12.156467-87.142675c-5.694345-37.653057-11.804569-75.178151-17.818822-112.767227a3259.14881 3259.14881 0 0 0-29.111539-158.993792c-0.44787-2.335321-0.671805-4.734624-1.3756-7.005964-1.663517-5.118512-0.063981-7.837722 4.958559-9.821146C1191.012355 47.641834 1238.61452 24.448575 1288.2321 6.149893c6.494113-2.431293 13.052207-5.150503 20.058171-5.854299 6.302168-0.639814 7.901704 0.383888 7.29388 7.101936-3.327033 36.43741-1.407591 73.066765-3.135089 109.536166-1.407591 29.751354-1.247637 59.598679 0.255926 89.382023 0.351898 7.549806 0.639814 15.131602 0.575832 22.649418-0.383888 35.765606 1.503563 71.499221 3.327033 107.200845 2.335321 47.186286 5.758326 94.276601 9.245313 141.398906 2.527266 34.006117 5.822308 67.948253 9.021379 101.922379 1.695507 18.586598 3.518977 37.141206 5.822308 55.631832 1.247637 10.205034 1.759489 10.301006 11.772578 8.957396 17.658868-2.399303 35.349726-4.350736 53.200539-4.09481 62.637796 0.799768 124.027954 10.684895 184.266447 27.863902 40.788146 11.580634 80.488608 26.040432 117.981712 46.290547a253.55831 253.55831 0 0 1 47.218277 32.438573zM308.676783 922.811488c23.161269-11.068783 135.608589-98.947243 144.533995-113.279078-54.576139-23.513166-109.344222-45.362816-168.239105-63.24562l23.70511 176.524698z m1277.196815-107.520752c2.879163-3.103098 2.559256-5.502401-1.343609-7.229899-7.773741-3.550968-15.4835-7.325871-23.353213-10.556932-42.003793-17.179007-84.19953-33.814173-127.482951-47.37823-3.774903-1.151665-7.645778-3.774903-12.476374-1.535554l23.321222 173.45359c3.454996 0.767777 4.798605-0.831758 6.33416-1.919442 39.316574-28.855614 78.889073-57.35933 116.638102-88.390312 6.36615-5.182494 12.668318-10.396978 18.362663-16.443221z" fill="var(--MikuColor)" p-id="4405"></path></svg>`;
const SearchICON = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path clip-rule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909ZM18 11a7 7 0 11-14 0 7 7 0 0114 0Z" fill-rule="evenodd"></path></svg>`;
const FollowingICON = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z"></path></svg>`;
const PlayListICON = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"></path></svg>`;
const PlayListICON_Active = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path d="M15 19v-8l7 4-7 4Zm7-12H2v2h20V7Zm-9 6H2v-2h11v2Zm0 4H2v-2h11v2Z"></path></svg>`;
const HistoryICON = `<svg xmlns="http://www.w3.org/2000/svg" height="24" style="pointer-events: none; display: block;" viewBox="0 0 24 24" width="24" focusable="false"><g><path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z"></path></g></svg>`;
const HistoryICON_Active = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 2C8.73 2 5.8 3.44 4 5.83V3.02H2V9h6V7H5.62C7.08 5.09 9.36 4 12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8H2c0 5.51 4.49 10 10 10s10-4.49 10-10S17.51 2 12 2z"></path></svg>`;
const MenuICON = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block;"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>`;
let OpID = location.pathname,
  PageID = location.pathname;
let Current = "";
const CleanTimer = [];
const CleanTimer2 = [];
const JumpMapping = {
  HOME: "https://www.bilibili.com/",
  ANIME: "https://www.bilibili.com/anime",
  GAME: "https://www.bilibili.com/v/game/",
  SELF: "https://t.bilibili.com/",
  LOGO: "https://www.bilibili.com/",
  HISTORY: "https://www.bilibili.com/account/history",
};
const HeaderMapping = {
  home: "div.bili-header.large-header",
  game: "div.bili-header.large-header",
  profile: "div#biliMainHeader",
  "profile-collect": "div#biliMainHeader",
  dynamic: "div#bili-header-container",
  search: "div#bili-header-container",
  read: "div#bili-header-container",
  bangumi: "div#biliMainHeader",
  history: "div#biliMainHeader",
  player: "body",
  unknown: "div.bili-header.large-header",
};
const DetectMapping = {
  home: "main.bili-feed4-layout",
  game: "div.palette-button-outer",
  profile: "div#app",
  "profile-collect": "div#app",
  dynamic: "body",
  history: "div#app",
  search: "body",
  read: "body",
  player: "body",
  bangumi: "div#app",
  unknown: "div#app",
};
// Get Current Page
function GetCurrent() {
  for (const i of CleanTimer) {
    clearInterval(i);
  }
  for (const i of CleanTimer2) {
    clearTimeout(i);
  }
  if (
    location.origin === "https://www.bilibili.com" &&
    location.pathname.replace("index.html", "") === "/"
  )
    return "home";
  if (
    location.origin === "https://www.bilibili.com" &&
    location.pathname.includes("/video/")
  )
    return "player";
  if (
    location.origin === "https://www.bilibili.com" &&
    location.pathname.includes("/v/game")
  )
    return "game";
  if (
    location.origin === "https://www.bilibili.com" &&
    location.pathname.includes("/anime")
  )
    return "bangumi";
  if (
    location.origin === "https://www.bilibili.com" &&
    location.pathname.includes("account/history")
  )
    return "history";
  if (
    location.origin === "https://www.bilibili.com" &&
    location.pathname.includes("/read")
  )
    return "read";
  if (
    location.origin === "https://space.bilibili.com" &&
    location.pathname.includes("/favlist")
  )
    return "profile-collect";

  if (location.origin === "https://space.bilibili.com") return "profile";
  if (location.origin === "https://t.bilibili.com") return "dynamic";
  if (location.origin === "https://search.bilibili.com") return "search";

  return "unknown";
}
Current = GetCurrent();
const PageDetector = setInterval(() => {
  PageID = location.pathname;
  if (OpID !== PageID) {
    Current = GetCurrent();
    DoClean();
    setTimeout(() => {
      document.head.appendChild(NewStyleSheet);
    }, 500);
  }
}, 1000);
const NewStyleSheet = document.createElement("style");
NewStyleSheet.innerHTML = `
    div.floor-single-card{
        display:none !important;
    }
    div.bili-live-card{
        display:none !important;
    }
    :where(div.bili-video-card.is-rcmd):not(.enable-no-interest){
        display:none !important;
    }
    div.recommended-swipe.grid-anchor{
        display:none !important;
    }
    div#slide_ad{
        display:none !important;
    }
    a.ad-report.video-card-ad-small{
        display:none !important;
    }
    div.bili-header__banner{
        display:none !important;
    }
    div.bili-header__channel{
        display:none !important;
    }
    div.header-channel{
        display:none !important;
    }
    div.fixed-channel-shim{
        display:none !important;
    }
    main.bili-feed4-layout{
        display:flex;
        margin-left:0px !important;
        margin-right:0px !important;
        padding-left:0px !important;
    }

    div.bili-header__bar{
        display:none !important;
    }
    :root{
        --GuideBarOnSelecting:#F2F2F2;
        --GuideBarTextColor:#0f0f0f;
        --GuideBarOnSelectHoverBG:#E6E6E6;
        --GuideBarHover:#f2f2f2;
        --GuideBarSpiltorBG:#E5E5E5;
        --GuideBarSubTextColor:#606060;
        --MikuColor:#39c5bb;
        --NewContentPoint:#39c5bb;
    }
    .bili-header .right-entry__outside .right-entry-icon{
        color:var(--GuideBarTextColor) !important;
    }
    div.NewGuideBar{
        z-index:10001;
        box-sizing: border-box;
        width:240px;
        height:100%;
        position:fixed;
        top:64px;
        left:0px;
        color:var(--GuideBarTextColor);
        font-family:"Roboto", Arial, sans-serif;
        padding-right:11px;
        font-size:14px;
        background:#fff;
        font-weight:500;
        overflow:scroll;
        transition:transform .6s;
        transform:translateX(0%);
    }
    div.NewGuideBar::-webkit-scrollbar{
      display:none;
    }
    div.NewGuideBar-Square{
        box-sizing: border-box;
        width:100%;
        height:fit-content;
        padding:12px;
    }
    div.NewGuideBar-Item{
        height:40px;
        box-sizing: border-box;
        border-radius:10px;
        overflow:hidden;
        display:flex;
        transition:background .4s;
        padding-right:10px;
        cursor:pointer;

    }
    div.NewGuideBar.Shrink{
      transform:translateX(-100%);
    }
    div.NewGuideBar-Item.Selecting{
        background:var(--GuideBarOnSelecting);
    }
    div.NewGuideBar-Item.Selecting:hover:not(.DisabledHovering){
        background:var(--GuideBarOnSelectHoverBG);
    }
    div.NewGuideBar-Item:not(.Selecting):hover:not(.DisabledHovering){
        background:var(--GuideBarHover);
    }
    div.SelectingICON{
        display:none;
    }
    div.UnselectingICON{
        display:grid;
    }
    div.NewGuideBar-Item.Uploader{
      position:relative;
      padding-right:25px;
    }
    div.NewGuideBar-Item.Uploader.HasNew::before{
      content:"";
      height:5px;
      width:5px;
      border-radius:50%;
      overflow:hidden;
      background:var(--NewContentPoint);
      position:absolute;
      top:18px;
      right:12px;
    }
    div.NewGuideBar-Item.Selecting .UnselectingICON{
        display:none !important;
    }
    div.NewGuideBar-Item.Selecting div.SelectingICON{
        display:grid !important;
    }
    div.NewHeadBar{
        z-index:10000;
        box-sizing: border-box;
        height:64px;
        width:100%;
        position:fixed;
        top:0px;
        left:0px;
        display:flex;
        padding-right:16px;
        background:#fff;

    }

    div.ICON{
        box-sizing: border-box;
        height:40px;
        width:60px;
        line-height:60px;
        fill: currentcolor;
        place-content: center;
    }
    div.ICON:not(.UnselectingICON,.SelectingICON){
      display:grid;
    }
    div.ICON svg{
        height:24px;
        width:24px;
        margin-right: 12px;
    }
    div.ICON img{
        height:28px;
        width:28px;
        border-radius:50%;
        object-fit:cover;
        overflow:hidden;
        margin-right: 12px;
    }
    div.NewGuideBar-Item-Content{
        width:132px;
        height:40px;
        padding-left:10px;
        display:flex;
        align-items:center;
        box-sizing: border-box;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    div.NewGuideBar-Item-Content.BiggerFont{
        font-size: 16px !important;
    }
    div.NewGuideBar-Item-Content svg{
        margin-left:6px;
    }
    div.NewGuideBar-Splitor{
        height:5px;
        line-height:5px;
        position:relative;
        box-sizing: border-box;
    }
    div.NewGuideBar-Splitor:before{
        content:"";
        position:absolute;
        top:2px;
        left:12px;
        height:1px;
        width:205px;
        background:var(--GuideBarSpiltorBG);
    }
    div.NewHeadBar-Logo{
        height:100%;
        width:224px;
        display:flex;
        align-items:center;
        justify-content:space-evenly;
        padding:16px;
        padding-right:43px;
        box-sizing: border-box;
    }
    div.NewHeadBar-Logo .PageLogo{
      height:100%;
      cursor:pointer;
    }
    div.NewHeadBar-Logo .PageLogo svg{
        height:100%;
        width:fit-content;
    }
    div.NewHeadBar-Other{
        flex:1;
        width:0px;
        height:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        box-sizing: border-box;
    }
    form.NewHeadBar-SearchRegion{
        flex:1;
        min-width: 0;
        height:40px;
        display: flex;
        align-items:center;
        justify-content: center;
        box-sizing: border-box;
    }
    form.NewHeadBar-SearchRegion .SearchBar{
        height:100%;
        border-top-left-radius:40px;
        border-bottom-left-radius:40px;
        text-indent:20px;
        flex:0 1 732px;
        outline:none;
        border:1px solid var(--GuideBarSpiltorBG);
        box-sizing: border-box;
    }
    form.NewHeadBar-SearchRegion .SearchIcon{
        height:100%;
        width:64px;
        border-top-right-radius:40px;
        border-bottom-right-radius:40px;
        border:1px solid var(--GuideBarSpiltorBG);
        display:grid;
        place-content:center;
        box-sizing: border-box;
    }
    div.HeadBar-ICON{
      height:40px;
      width:40px;
      border-radius:50%;
      cursor:pointer;
      transition:background .3s;
      overflow:hidden;
      display:grid;
      place-content:center;
      box-sizing: border-box;
    }
    div.HeadBar-ICON:hover{
        background:var(--GuideBarHover);
    }
    div.NewHeadBar-UserRegion{
        min-width: 225px;
        height:100%;
        align-items: center;
        justify-content: flex-end;
        display:flex;
        box-sizing: border-box;
    }
    .NewHeadBar-UserSpace{
        height:32px;
        width:60px;
        text-align:center;
        box-sizing: border-box;
    }
    .NewHeadBar-UserSpace img{
        object-fit:cover;
        height:100%;
        width:32px;
        border-radius:50%;
        cursor:pointer;
        overflow:hidden;
        box-sizing: border-box;
    }
    div.feed-card{
        margin-top:22px !important;
    }
    div.wrapper{
        margin:unset;
        width:100% !important;
    } 
    div#page-index{
        display:flex !important;
    }
    div#page-index .col-1{
        flex:1;
        margin-right: 10px;
    }
    div.fixed-wrapper.fixed-wrapper-sticky.fixed-wrapper-shown{
        display:none !important;
    }
    div.GuideBarPlaceHolder{
      height:100px;
      width:100%;
    }
    div#page-dynamic{
      display:flex !important;
    }
    div#page-dynamic .col-1{
      width:0px !important;
      flex:1;
    }
    div.col-full.clearfix{
      display:flex;
    }
    .contribution-sidenav~.main-content{
      width:0px !important;
      flex:1;
    }
    div.fav-main.section{
      width:0px !important;
      flex:1;
    }
    #page-bangumi .content{
      width:unset !important;
    }
    #page-setting .setting-privacy{
      justify-content:space-between;
    }
    #page-fav .fav-main .small-item:nth-child(5n){
      margin-right:20px !important;
    }
    #page-fav .fav-main .small-item:nth-child(6n){
      margin-right:0px !important;
    }
    #page-fav .fav-main .fav-video-list{
      margin: 20px 100px 50px;
    }
    div#bilibili-player{
      width:unset !important;
    }
`;
NewStyleSheet.innerHTML += `
    div#activity_vote,div.toolbar-right-ai.disabled,div.reply-decorate,div.bili-avatar-pendent-dom,div.reply-notice,a.pop-live-small-mode.part-1,div.search-input,a#right-bottom-banner,a#bannerAd{
      display:none !important;
    }
    div.root-reply-avatar{
      padding-top: 2px !important;
    }
    div.sub-user-info div.sub-user-name,div.user-info div.user-name{
      color:var(--GuideBarTextColor) !important;

    }
    div.user-info{
      margin-bottom: 0px !important;
      line-height: 16px;
      height: 16px;
    }
    span.reply-content{
      color:var(--GuideBarTextColor) !important;
      font-family: "Roboto", "Arial", sans-serif;
      font-size: 14px !important;
      font-weight: 400;
      line-height: 20px !important;
    }
    div.sub-user-info div.sub-user-name[data-user-id="9024239"],div.user-info div.user-name[data-user-id="9024239"]{
      color:gold !important;
    }
    div.sub-reply-avatar{
      padding-top: 14px !important;
    }
    div#biliMainHeader{
      min-height:64px !important;
      height:64px !important;
      max-height:64px !important;
    }
    div.nav-tool-container.inner-content-wrapper{
        display:none !important;
    }
    div.home-banner-wrapper{
        margin:unset;
        margin-top: 6px;
    }
    div.fixed-wrapper{
        box-sizing:border-box;
        padding-left:240px;
        transition:padding .4s;
    }
    div#app{
        padding-left:240px;
        transition:padding .4s;
    }
    div.search-layout.clearfix{
      padding-left:240px;
      transition:padding .4s;
    }
    main.bili-feed4-layout div.feed2{
        padding-left:240px;
        transition:padding .4s;
        flex:1;
        width:0px;
        height:fit-content;
    }
    div.NewGuideBar.Shrink ~ div#app{
      padding-left:0px !important;
    }
    div.NewGuideBar.Shrink ~ div.fixed-wrapper{
      padding-left:0px !important;
    }
    div.NewGuideBar.Shrink ~ div.search-layout.clearfix{
      padding-left:0px !important;
    }
    div.NewGuideBar.Shrink ~  div.feed2{
      padding-left:140px !important;
    }
    main.channel-layout{
        padding:unset;
        box-sizing:border-box;
        padding:6px;
        padding-left:246px;
    }
    div.NewGuideBar.Shrink ~  main.channel-layout{
      padding-left:6px !important;
    }
    div.palette-button-outer{
        pointer-events:unset;
    }
    div.palette-button-inner{
        display:none !important;
    }
    div#app .left-container{
        width:0px;
        flex:1;
    }
    h3.bili-video-card__info--tit a{
      color: var(--GuideBarTextColor) !important;
      font-size: 16px !important;
      line-height: 22px !important;
      padding-right:0px !important;
    }
    a.bili-video-card__info--owner{
      color:var(--GuideBarSubTextColor);
    }
    .bili-video-card a:not(.disable-hover):hover {
      color:var(--GuideBarTextColor) !important;
    }
    div.feed-roll-btn{
      top:20px !important;
    }
    div.Popup.Deactive{
      pointer-event:none;
    }
    div.Popup{
      opacity:0;
      height:0px !important;
      position:absolute;
      transition:all .4s;
      background:#fff;
    }
    div.Popup.Active{
      opacity:1 !important;
      pointer-event:unset !important;
      height:fit-content !important;
    }
    div.NewHeadBar-Following-Popup{
      top:64px;
      filter:drop-shadow(0px 0px 8px var(--GuideBarSpiltorBG));
      border-radius:8px;
      overflow:scroll;
      right:0px;
      box-sizing:border-box;
      padding:8px;
      display:flex;
      flex-direction:column;
      flex-wrap:wrap;
    }
    div.NewHeadBar-Profile-Popup{
      top:64px;
      width:320px;
      filter:drop-shadow(0px 0px 8px var(--GuideBarSpiltorBG));
      border-radius:8px;
      overflow:scroll;
      right:0px;
      box-sizing:border-box;
      padding:8px;
      display:flex;
      flex-direction:column;
    }
    div.NewHeadBar-Profile-Popup::-webkit-scrollbar{
      display:none;
    }
    div.NewHeadBar-Following-Popup::-webkit-scrollbar{
      display:none;
    }

    #PopUserInfo{
      box-sizing:border-box;
      display:flex;
      height:100px;
      width:100%;
      border-bottom:1px solid var(--GuideBarSpiltorBG);
      padding-bottom:8px;
    }
    #PopUserInfo .PopUserAvatar{
      width:90px;
      height:100%;
      display:grid;
      place-content:center;
    }
    #PopUserInfo .PopUserAvatar img{
      height:50px;
      width:50px;
      border-radius:50%;
      overflow:hidden;
    }
    .PopUserName{
      flex:1;
      height:100%;
      font-family: "Roboto", "Arial", sans-serif;
      font-size:16px;
      font-weight:400;
      color:var(--GuideBarTextColor);
    }
    .PopUserName_username{
      box-sizing:border-box;
      width:100%;
      height:35%;
      padding-top:10px;
    }
    .PopUserName_uid{
      width:100%;
      height:30%;
    }
    .PopUserName_userspace{
      box-sizing:border-box;
      width:100%;
      height:35%;
      font-size:14px;
      padding-bottom:8px;
      color:var(--brand_blue);
    }
    .UserHistory{
      flex:1;
      width:100%;
      display:flex;
      flex-direction:column;
    }
    .UserHistoryTitle{
      width:100%;
      height:32px;
      line-height:32px;
      vertical-align:middle;
      font-size:16px;
      font-family: "Roboto", "Arial", sans-serif;
      font-weight:500;
      display:flex;
      box-sizing: border-box;
      padding: 6px;
    }
    .UserHistoryTitle-Item{
      width:100%;
      height:100%;
    }
    .UserHistoryTitle-Refresh{
      text-align:right;
      color:var(--brand_blue);
      user-select:none;
      cursor:pointer;
    }
    .HistoryList{
      flex:1;
      max-height:75vh;
      width:100%;
    }
    .UserHistoryItem{
      border-radius:4px;
      overflow:hidden;
      height:85px;
      width:100%;
      background:#fff;
      display:flex;
      cursor:pointer;
      box-sizing:border-box;
      padding:3px;
      transition:background .3s;
    }
    #FollowingPopup .UserHistoryItem{
      width:320px !important;
    }
    #FollowingPopup .UserHistory{
      flex-wrap:wrap;
    }
    .UserHistoryItem:hover{
      background:var(--GuideBarHover)
    }
    .HistoryVideoCover{
      box-sizing:border-box;
      width:100px;
      height:100%;
      display:grid;
      padding:3px;
      place-content:center;
    }
    .HistoryVideoCover img{
      object-fit:cover;
      width:100%;
      aspect-ratio: 1.6 / 1;
      border-radius:4px;
      overflow:hidden;
    }
    .HistoryVideoInfo{
      flex:1;
      height:100%;
      box-sizing:border-box;
      overflow:hidden;
      padding:3px;
      column-gap:4px;
      display:flex;
      flex-direction:column;
      justify-content:center;
    }
    .HistoryVideoTitle{
      width:100%;
      font-size:16px;
      font-weight:400;
      font-family: "Roboto", "Arial", sans-serif;
      overflow: hidden;
      text-overflow: ellipsis;
      color:var(--GuideBarTextColor);
      line-height:initial;
      height:41px;
    }
    .HistoryVideoUploaderName{
      width:100%;
      font-size:14px;
      font-weight:400;
      font-family: "Roboto", "Arial", sans-serif;
      color:var(--GuideBarSubTextColor);
      line-height:initial;
      display:flex;
    }
    .HistoryVideoUploaderName .HistoryLeft,.HistoryVideoUploaderName .HistoryRight{
      word-break: keep-all;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;  
      width:100%;
    }
    .HistoryVideoUploaderName .HistoryRight{
      text-align:right;
    }

    
`;
const NewHeadBar = document.createElement("div");
const GetSearchWords = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("keyword");
  return keyword;
};
NewHeadBar.classList.add("NewHeadBar");
NewHeadBar.innerHTML = `
    <div class="NewHeadBar-Logo">
      <div class="MenuICON HeadBar-ICON" id="MenuSwitch">
        ${MenuICON}
      </div>
      <div class="PageLogo" id="LOGO">
        ${MainLogoICON}
      </div>

    </div>
    <div class="NewHeadBar-Other">
        <form action="https://search.bilibili.com/all" method="get" class="NewHeadBar-SearchRegion">
            <input class="SearchBar" placeholder="搜索" required type="text" id="SearchBar" name="keyword" value="${
              Current === "search" ? GetSearchWords() || "" : ""
            }">
            <button class="SearchIcon" id="SearchBarSubmitter">${SearchICON}</button>
        </form>
        <div class="NewHeadBar-UserRegion">
            <div class="NewHeadBar-Following HeadBar-ICON" id="Following">
                ${FollowingICON}
            </div>
            <div class="NewHeadBar-UserSpace" id="Userspace">
                <img id="UserAvatar">
            </div>
        </div>
        <div class="NewHeadBar-Following-Popup Popup Deactive" id="FollowingPopup">
        </div>
        <div class="NewHeadBar-Profile-Popup Popup Deactive" id="ProfilePopup">

        </div>
    </div>
`;
const NewGuideBar = document.createElement("div");
NewGuideBar.classList.add("NewGuideBar");
if (Current === "player" || localStorage.getItem("BarState") === "Hide")
  NewGuideBar.classList.add("Shrink");
NewGuideBar.id = "NewGuideBar";
NewGuideBar.innerHTML = `
    <div class="NewGuideBar-Square">
        <div class="NewGuideBar-Item${
          Current === "home" ? " Selecting" : ""
        }" id="HOME" label="home">
            <div class="UnselectingICON ICON">
                ${HomeICON}
            </div>
            <div class="SelectingICON ICON">
                ${HomeICON_Active}
            </div>
            <div class="NewGuideBar-Item-Content">首页</div>
        </div>
        <div class="NewGuideBar-Item${
          Current === "bangumi" ? " Selecting" : ""
        }" id="ANIME" label="bangumi">
            <div class="UnselectingICON ICON">
                ${AnimeICON}
            </div>
            <div class="SelectingICON ICON">
                ${AnimeICON_Active}
            </div>
            <div class="NewGuideBar-Item-Content">番剧</div>
        </div>
        <div class="NewGuideBar-Item${
          Current === "game" ? " Selecting" : ""
        }" id="GAME" label="game">
        <div class="UnselectingICON ICON">
                ${GameICON}
            </div>
            <div class="SelectingICON ICON">
                ${GameICON_Active}
            </div>
            <div class="NewGuideBar-Item-Content">游戏</div>
        </div>
    </div>
    <div class="NewGuideBar-Splitor"></div>
    <div class="NewGuideBar-Square">
        <div class="NewGuideBar-Item${
          Current === "dynamic" ? " Selecting" : ""
        }" id="SELF" label="dynamic">
            <div class="NewGuideBar-Item-Content BiggerFont">我 ${ArrowICON}</div>
        </div>
        <div class="NewGuideBar-Item${
          Current === "profile-collect" ? " Selecting" : ""
        }"  id="COLLECT" label="profile-collect">
          <div class="UnselectingICON ICON">
                ${PlayListICON}
            </div>
            <div class="SelectingICON ICON">
                ${PlayListICON_Active}
            </div>
            <div class="NewGuideBar-Item-Content">我的收藏</div>
        </div>
        <div class="NewGuideBar-Item${
          Current === "history" ? " Selecting" : ""
        }" label="history" id="HISTORY">
          <div class="UnselectingICON ICON">
                ${HistoryICON}
            </div>
            <div class="SelectingICON ICON">
                ${HistoryICON_Active}
            </div>
            <div class="NewGuideBar-Item-Content">历史记录</div>
        </div>
    </div>
    
`;
const DoClean = () => {
  PageID = location.pathname;
  OpID = PageID;
  switch (Current) {
    case "home":
      let HomeCleanLock = false;
      CleanTimer.push(
        setInterval(() => {
          if (!HomeCleanLock) {
            HomeCleanLock = true;
            for (const i of document.querySelectorAll("div.feed-card")) {
              // Kill Rcmd Ads
              if (
                i
                  .querySelector("a.bili-video-card__image--link")
                  .href.includes("cm.bilibili")
              ) {
                i.setAttribute("style", "display:none !important;");
                i.setAttribute("class", "KilledTag");
              }
            }
            HomeCleanLock = false;
          }
        }),
        500
      );
      break;
    default:
      break;
  }
};

const BuildPageAfterLoaded = () => {
  return new Promise((resolve) => {
    const __detector__ = setInterval(() => {
      const target = document.querySelector(DetectMapping[Current]);
      if (target) {
        resolve(target);
        clearInterval(__detector__);
      }
    }, 100);
  });
};
DoClean();
const NewVideos = {
  HasNewContent: false,
  Contents: {},
};
if (localStorage.getItem("DetectingVideos") === null)
  localStorage.setItem("DetectingVideos", "{}");
const DetectingVideos = JSON.parse(localStorage.getItem("DetectingVideos"));
if (Current === "player" || Current === "read") {
  for (const i in DetectingVideos) {
    if (location.href.includes(DetectingVideos[i])) {
      localStorage.setItem(
        "UploaderCheckedCache-" + UploaderMid,
        DetectingVideos[i]
      );
      delete DetectingVideos[i];
    }
  }
  localStorage.setItem("DetectingVideos", JSON.stringify(DetectingVideos));
}
const HasNew = (UploaderMid, Videos) => {
  const record = localStorage.getItem("UploaderCheckedCache-" + UploaderMid);
  if (Videos[0]["VideoLink"].includes(record)) return "";
  else {
    DetectingVideos[UploaderMid] = Videos[0]["VideoLink"].includes("/video/")
      ? Videos[0]["VideoLink"].split("/video/")[1].replaceAll("/", "")
      : Videos[0]["VideoLink"].split("/read/")[1].replaceAll("/", "");
    return " HasNew";
  }
};
const BuildFollowingSquare = (Data) => {
  let OriString_Start = `<div class="NewGuideBar-Square"> <div class="NewGuideBar-Item DisabledHovering" style="cursor:unset;"> <div class="NewGuideBar-Item-Content BiggerFont">订阅</div> </div>`;
  let OriString_End = `</div><div class="GuideBarPlaceHolder"></div>`;
  const SingleTemplate = `<div class="NewGuideBar-Item Uploader#HasNew#" onclick="(()=>{localStorage.setItem('UploaderCheckedCache-#AuthorMid#','#AuthorLatestVideo#');location.href='#AuthorSpace#';})()"> 
    <div class="ICON">
        <img src="#AuthorAvatar#" />
    </div>
    <div class="NewGuideBar-Item-Content">
        #AuthorName#
    </div>
  </div>`;
  for (const i in Data) {
    let CopiedValue = new String(SingleTemplate);
    CopiedValue = CopiedValue.replace("#AuthorSpace#", Data[i].Userspace)
      .replace("#AuthorAvatar#", Data[i].Avatar)
      .replace("#AuthorName#", Data[i].Username)
      .replace("#AuthorMid#", Data[i].Usermid)
      .replace(
        "#AuthorLatestVideo#",
        Data[i].Videos[0]["VideoLink"].includes("/video/")
          ? Data[i].Videos[0]["VideoLink"]
              .split("/video/")[1]
              .replaceAll("/", "")
          : Data[i].Videos[0]["VideoLink"]
              .split("/read/")[1]
              .replaceAll("/", "")
      )
      .replace("#HasNew#", HasNew(Data[i].Usermid, Data[i].Videos));
    OriString_Start += CopiedValue;
  }
  localStorage.setItem("DetectingVideos", JSON.stringify(DetectingVideos));
  NewGuideBar.innerHTML +=
    `<div class="NewGuideBar-Splitor"></div>` + OriString_Start + OriString_End;
  BuildPopupSubscribe(Data);
};
const RefreshHistoryList = () => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://api.bilibili.com/x/web-interface/history/cursor?type=archive&ps=5",
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 0) {
          const vList = data.data.list;
          const TemplateString = `<div class="UserHistoryItem" onclick="(()=>{location.href='https://www.bilibili.com/video/#VideoBvid##VideoProgress#'})()">
              <div class="HistoryVideoCover">
                <img src="#VideoCover#">
              </div>
              <div class="HistoryVideoInfo">
                <div class="HistoryVideoTitle">
                  #VideoTitle#
                </div>
                <div class="HistoryVideoUploaderName">
                  <div class="HistoryLeft">#VideoHasWatched#</div>
                  <div class="HistoryRight">#VideoUploaderName#</div>
                  
                </div>
              </div>
            </div>`;
          let OriString = "";
          for (const i of vList) {
            let thisObject = new String(TemplateString);
            thisObject = thisObject
              .replace("#VideoBvid#", i.history.bvid)
              .replace(
                "#VideoProgress#",
                `?p=${i.history.page}` +
                  (i.progress / i.duration < 0.9 &&
                  i.progress / i.duration > 0.1
                    ? `&t=${i.progress}`
                    : "")
              )
              .replace("#VideoCover#", i.cover + "@256w_144h_1c")
              .replace("#VideoTitle#", i.title)
              .replace("#VideoUploaderName#", i.author_name)
              .replace(
                "#VideoHasWatched#",
                i.progress / i.duration > 0
                  ? `已看${((i.progress / i.duration) * 100).toFixed(2)}%`
                  : i.progress < 0
                  ? "已看完"
                  : "还未看"
              );
            OriString += thisObject;
          }
          resolve(OriString);
        }
      })
      .catch((e) => reject(e));
  });
};
const BuildPopupProfile = (Data) => {
  const target = document.getElementById("ProfilePopup");
  document.getElementById("UserAvatar").src = Data.face + "@120w_120h_1c";
  target.innerHTML = `
  <div class="PopUserInfo" id="PopUserInfo">
    <div class="PopUserAvatar">
      <img src="${Data.face + "@120w_120h_1c"}">
    </div>
    <div class="PopUserName">
      <div class="PopUserName_username" style="margin-left:6px;">${
        Data.uname
      }</div>
      <div class="PopUserName_uid" style="margin-left:6px;">UID:${
        Data.mid
      }</div>
      <div class="PopUserName_userspace" style="margin-left:6px;">
        <a href="https://space.bilibili.com/${Data.mid}">前往自己的频道</a>
      </div>
    </div>
  </div>
  `;
  RefreshHistoryList().then((HL) => {
    target.innerHTML += `
    <div class="UserHistory">
      <div class="UserHistoryTitle">
        <div class="UserHistoryTitle-Content UserHistoryTitle-Item">观看历史</div>
        <a id="UserHistoryTitleRefresh" class="UserHistoryTitle-Refresh  UserHistoryTitle-Item"  Belong="PopUp">刷新</a>
      </div>
      <div class="HistoryList" id="HistoryList" Belong="PopUp">
        ${HL}
      </div>
    </div>
    `;
    document.getElementById("UserHistoryTitleRefresh").onclick = () => {
      RefreshHistoryList().then((HL) => {
        document.getElementById("HistoryList").innerHTML = HL;
      });
    };
  });
};
const BuildPopupSubscribe = (Data) => {
  const target = document.getElementById("FollowingPopup");
  const TemplateString = `<div class="UserHistoryItem" onclick="(()=>{location.href='#VideoLink#'})()">
      <div class="HistoryVideoCover">
        <img src="#VideoCover#">
      </div>
      <div class="HistoryVideoInfo">
        <div class="HistoryVideoTitle">
          #VideoTitle#
        </div>
        <div class="HistoryVideoUploaderName">
          <div class="HistoryLeft">#VideoUploaderName#</div>
        </div>
      </div>
    </div>`;
  let OriString = "";
  for (const i in Data) {
    let thisObject = new String(TemplateString);
    thisObject = thisObject
      .replace("#VideoLink#", Data[i].Videos[0]["VideoLink"])
      .replace(
        "#VideoCover#",
        Data[i].Videos[0]["VideoCover"] + "@256w_144h_1c"
      )
      .replace("#VideoTitle#", Data[i].Videos[0]["VideoTitle"])
      .replace("#VideoUploaderName#", Data[i].Username);
    OriString += thisObject;
  }
  target.innerHTML += `
      <div class="UserHistory">
        <div class="UserHistoryTitle">
          订阅
        </div>
        <div class="HistoryList">
          ${OriString}
        </div>
      </div>
  `;
};
const PopupController = {
  isPopingup: false,
  currentPopingup: null,
  triggerEle: null,
};
if (Current !== "unknown") {
  BuildPageAfterLoaded().then((target) => {
    document.head.appendChild(NewStyleSheet);
    target.insertBefore(NewGuideBar, target.firstChild);
    const __temp__ = setInterval(() => {
      const target = document.querySelector(HeaderMapping[Current]);
      if (target) {
        try {
          document
            .querySelector(HeaderMapping[Current])
            .appendChild(NewHeadBar);
        } catch (e) {
          console.log(e);
          console.trace();
        }
        clearInterval(__temp__);
        if (
          localStorage.getItem("ContentCacheTimestamp") === null ||
          Date.now() - parseInt(localStorage.getItem("ContentCacheTimestamp")) >
            300 * 1000
        ) {
          fetch("https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/nav", {
            method: "GET",
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.code === 0) {
                const vList = data.data;
                NewVideos["HasNewContent"] = vList["has_more"];
                for (const i of vList.items) {
                  const AuthorData = i.author;
                  const Avatar = AuthorData.face;
                  const Username = AuthorData.name;
                  const Userspace = AuthorData.jump_url;
                  const Usermid = AuthorData.mid;
                  const VideoTitle = i.title;
                  const VideoLink = i.jump_url;
                  const VideoCover = i.cover;
                  if (!NewVideos["Contents"][Usermid.toString()])
                    NewVideos["Contents"][Usermid.toString()] = {
                      Avatar: Avatar,
                      Username: Username,
                      Userspace: Userspace,
                      Usermid: Usermid,
                      Videos: [],
                    };
                  NewVideos["Contents"][Usermid.toString()]["Videos"].push({
                    VideoTitle: VideoTitle,
                    VideoLink: VideoLink,
                    VideoCover: VideoCover,
                  });
                }
                BuildFollowingSquare(NewVideos["Contents"]);
                localStorage.setItem("ContentCacheTimestamp", Date.now());
                localStorage.setItem(
                  "ContentCache",
                  JSON.stringify(NewVideos["Contents"])
                );
                for (const i in JumpMapping) {
                  const Target = document.getElementById(i);
                  if (Target) {
                    Target.onclick = () => {
                      if (location.href !== JumpMapping[i]) {
                        location.href = JumpMapping[i];
                      } else {
                        location.reload();
                      }
                    };
                  }
                }
              }
            });
        } else {
          NewVideos["HasNewContent"] = false;
          NewVideos["Contents"] = JSON.parse(
            localStorage.getItem("ContentCache")
          );
          BuildFollowingSquare(NewVideos["Contents"]);
          for (const i in JumpMapping) {
            const Target = document.getElementById(i);
            if (Target) {
              Target.onclick = () => {
                if (location.href !== JumpMapping[i]) {
                  location.href = JumpMapping[i];
                } else {
                  location.reload();
                }
              };
            }
          }
        }
        if (
          localStorage.getItem("UserInfoCacheTimestamp") === null ||
          Date.now() -
            parseInt(localStorage.getItem("UserInfoCacheTimestamp")) >
            60 * 1000
        ) {
          fetch("https://api.bilibili.com/x/web-interface/nav", {
            method: "GET",
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.code === 0) {
                localStorage.setItem(
                  "UserInfoCache",
                  JSON.stringify(data.data)
                );
                localStorage.setItem("UserInfoCacheTimestamp", Date.now());
                BuildPopupProfile(data.data);
                document.getElementById("COLLECT").onclick = () => {
                  location.href = `https://space.bilibili.com/${data.data.mid}/favlist`;
                };
              }
            });
        } else {
          const data = JSON.parse(localStorage.getItem("UserInfoCache"));
          BuildPopupProfile(data);

          document.getElementById("COLLECT").onclick = () => {
            location.href = `https://space.bilibili.com/${data.mid}/favlist`;
          };
        }

        document.body.addEventListener("click", (e) => {
          // console.log(e);
          if (e.target.getAttribute("Belong") !== "PopUp"&&
            PopupController.isPopingup &&
            e.target !== PopupController.currentPopingup &&
            ![...PopupController.triggerEle.children].includes(e.target) &&
            e.target !== PopupController.triggerEle
          ) {
            PopupController.currentPopingup.classList.remove("Active");
            PopupController.currentPopingup.classList.add("Deactive");
            PopupController.isPopingup = false;
            PopupController.triggerEle = null;
            PopupController.currentPopingup = null;
          }
        });
        document.getElementById("Userspace").onclick = () => {
          const target = document.getElementById("ProfilePopup");
          if (
            PopupController.isPopingup &&
            PopupController.currentPopingup !== target
          ) {
            PopupController.currentPopingup.classList.remove("Active");
            PopupController.currentPopingup.classList.add("Deactive");
          }
          if (target.classList.contains("Deactive")) {
            PopupController.isPopingup = true;
            PopupController.currentPopingup = target;
            PopupController.triggerEle = document.getElementById("Userspace");
            target.classList.remove("Deactive");
            target.classList.add("Active");
          } else {
            PopupController.isPopingup = false;
            PopupController.currentPopingup = null;
            PopupController.triggerEle = null;
            target.classList.remove("Active");
            target.classList.add("Deactive");
          }
        };
        document.getElementById("Following").onclick = () => {
          const target = document.getElementById("FollowingPopup");
          if (
            PopupController.isPopingup &&
            PopupController.currentPopingup !== target
          ) {
            PopupController.currentPopingup.classList.remove("Active");
            PopupController.currentPopingup.classList.add("Deactive");
          }
          if (target.classList.contains("Deactive")) {
            PopupController.isPopingup = true;
            PopupController.currentPopingup = target;
            PopupController.triggerEle = document.getElementById("Following");
            target.classList.remove("Deactive");
            target.classList.add("Active");
          } else {
            PopupController.isPopingup = false;
            PopupController.currentPopingup = null;
            PopupController.triggerEle = null;
            target.classList.remove("Active");
            target.classList.add("Deactive");
          }
        };
        document.getElementById("MenuSwitch").onclick = () => {
          if (NewGuideBar.classList.contains("Shrink")) {
            NewGuideBar.classList.remove("Shrink");
            localStorage.setItem("BarState", "Show");
          } else {
            NewGuideBar.classList.add("Shrink");
            localStorage.setItem("BarState", "Hide");
          }
        };
      }
    }, 200);
  });
}

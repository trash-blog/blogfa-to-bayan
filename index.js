"use strict";

const general = {
  "<-BlogId->": "(*bog_title*)",
  "<-BlogUrl->": "(*blog_link*)",
  "<-BlogXmlLink->": "(*rss_link*)",
  "<-BlogArchiveLink->": "/archive",

  "<-BlogAuthor->": "(*blog_title*)",
  "<-BlogEmail->": "#",
  "<-BlogProfileLink->": "#",
  "<-BlogDescription->": "(*blog_short_description*)",
  "<-BlogTitle->": "(*blog_title*)",
  " <-BlogCustomHtml->":
    "ترجمه شده با <a href='https://trash.blog.ir' target='_blank'>مترجم قالب بلاگفا به بیان</a>",
};
const blogfaPost = {
  "<-PostTitle->": "(*post_title*)",
  "<-PostContent->": "(*post_full_content*)",
  "<-PostDate->": "(*post_date*)",
  "<-PostTime->": "(*post_date*)",
  "<-PostId->": "(*post_seq_num*)",
  "<-PostLink->": "(*post_link*)",
  "<-PostAuthorId->": "(*post_author_id*)",
  "<-PostAuthor->": "(*post_author*)",
  "<-PostAuthorEmail->": "",
  "<-PostAuthorLink->": "/by_author/(*post_author_id*)",
  "<-PostCategoryId->": "",
  "<-PostCategory->": `<box:post_categories><view:post_categories>
    <a href="(*category_link*)">(*category_name*)،</a>
    </view:post_categories></box:post_categories>`,

  BlogPostCategoriesBlock: "box:post_categories",
  BlogPostCategories: "view:post_categories",

  BlogExtendedPost: "check:if post_has_read_more",

  BlogPostTagsBlock: "box:post_tags",
  BlogPostTags: "view:post_tags",
  "<-TagLink->": "(*tag_link*)",
};

const blogfaPagination = {
  BlogNextAndPreviousBlock: "box:pagination",
  BlogPreviousPageBlock: "check:if page_prev",
  BlogNextPageBlock: "check:if page_next",
  "<-BlogNextPageLink->": "(*page_next*)",
  "<-BlogPreviousPageLink->": "(*page_prev*)",
};

const blogfaSidebar = {
  "BlogProfile>": "box:blog_info>",
  "<-BlogPhotoLink->": "(*blog_image*)",
  BlogPhoto: "check:if blog_image",
  "<-BlogAbout->": "(*blog_description*)",
  "<-check:if blog_imageLink->": "(*blog_image*)",

  BlogLinkDumpBlock: "box:daily_links",
  BlogLinkDump: "view:daily_links",
  "<-LinkUrl->": "(*link_url*)",
  "<-LinkDescription->": "(*link_name*)",
  "<-LinkTitle->": "(*link_name*)",

  "<BlogArchiveBlock": "<box:archive",
  "</BlogArchiveBlock>": "</box:archive>",
  BlogArchive: "view:archive",
  "<-ArchiveTitle->": "(*link_name*)",
  "<-ArchiveLink->": "(*link_url*) ((*link_count*))",

  BlogCategoriesBlock: "box:categories",
  BlogCategories: "view:categories",
  "<-CategoryLink->": "(*category_link*)",
  "<-CategoryName->": "(*category_name*) ((*category_post_count*))",

  BlogTagsBlock: "box:tag_cloud",
  BlogTags: "view:tag_cloud",
  "<-TagName->": "(*tag_name*)",
  "<-TagCount->": "(*tag_post_count*)",

  BlogAuthorsBlock: "box:authors",
  BlogAuthors: "view:authors",
  "<-AuthorName->": "(*author_name*)",
  "<-AuthorLink->": "(*author_link*)",

  BlogLinksBlock: "box:links",
  BlogLinks: "view:links",
  "<-LinkUrl->": "(*link_url*)",
  "<-LinkTitle->": "(*link_name*)",

  BlogPreviousItemsBlock: "box:recent_posts",
  BlogPreviousItems: "view:recent_posts",
};

const postCommentsHTML = `<div id="comments_wrapper">
                      <div class="comments_wrapper_header comments_clearfix">
                      <span class="right">نظرات ((*post_comment_count*))</span>
                      <span class="left"><a href="#">بستن</a></span>
                      </div>
                      <box:post_comments>
                        <div class="comments">
                            <view:post_comments>
                                <div class="comment comments_clearfix">
                                    <div class="right">
                                        <img class="avatar comment_avatar" src="(*comment_avatar*)" alt="(*comment_fullname*)">
                                    </div>
                                    <div class="comment_bubble">
                                        <div class="smalltip">
                                            <a href="(*comment_website*)">(*comment_fullname*)</a>
                                            <span class="left">(*comment_date*)</span>
                                        </div>
                                        <div>
                                            (*comment_body*)
                                        </div>
                                    </div>
                                </div>
                                <check:if comment_reply>
                                    <div class="comment is-reply">
                                        <div class="right">
                                            <img class="avatar comment_avatar" src="(*comment_reply_avatar*)" alt="(*comment_reply_fullname*)">
                                        </div>
                                        <div class="comment_bubble comment_reply_bubble">
                                            <div class="smalltip">
                                                <span>(*comment_reply_fullname*)</span>
                                                <span class="left">(*comment_reply_date*)</span>
                                            </div>
                                            <div class="comment_content">
                                                (*comment_reply*)
                                            </div>
                                        </div>
                                    </div>
                                </check:if>
                            </view:post_comments>
                        </div>
                    </box:post_comments>
	                  (*comment_add_form*)
                  </div>`;

let postCommentsCSS = `/*-Comment Styles-*/
.comment_bubble{
background:#fff;
border: 1px solid #0004;
margin: 10px 44px 10px 0;
padding: 8px;
border-radius:4px;
}
.comment_reply_bubble{
  margin-top:0;
}
.comment.is-reply {
  margin-right: 40px;
  margin-bottom: 20px;
}
#comments_wrapper {
  position: fixed;
  left: 0;
  width: 90%;
  max-width: 600px;
  height: 100%;
  top: 0;
  background: #f4f4f4;
  border-right: 1px solid #0004;
  color: #333;
  z-index: 20;
  transform: translateX(-100%);
  transition: 250ms ease;
  overflow: auto;
}
.comment_avatar{
  margin:0;
  width: 34px;
  border-radius: 4px;
}
.comments_wrapper_header{
  background: #fff;
  border-bottom: 1px solid #0004;
  padding: 10px 20px;
}
.comments{
  padding: 1rem;
}
#comments_wrapper:target {
  transform: scale(1);
}
.comments_clearfix:after{
  content: " ";
  display: table;
  clear: both;
}`;

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (from, to) {
    return this.replace(new RegExp(from, "g"), to);
  };
}

function repleaceFromObject(object, string) {
  let s = string;
  for (const i in object) {
    s = s.replaceAll(i, object[i]);
  }
  return s;
}

function TranslatePost(_code, options) {
  let code = _code;
  let blogfaTag = code.querySelector("BLOGFA");

  if (code.querySelector("BlogComment"))
    code.querySelector(
      "BlogComment"
    ).outerHTML = `<a href="(*post_link*)#comments_wrapper">(*post_comment_count*) نظر</a>`;

  let postList = translatePostList(blogfaTag.innerHTML);
  let postFull = translatePostDetial(blogfaTag.innerHTML, options);
  let page = translatePage(postFull);
  blogfaTag.outerHTML = postList + postFull + page;

  return code;
}

function translatePostList(blogfaCode) {
  let body = blogfaCode.replace("(*post_full_content*)", "(*post_summary*)");
  let postList = `<box:post_list>
      <check:if post_list_title>
        <div class="item_success">(*post_list_title*)</div>
      </check:if>
      <view:post_list>
      ${body}
      </view:post_list>
    </box:post_list>
  `;
  return postList;
}
function translatePostDetial(blogfaCode, options) {
  let postDetail = blogfaCode;

  postDetail = postDetail.replace(
    new RegExp("<check:if.*post_has_read_more.*", "ig"),
    ""
  );
  if (options.addCommentSection) {
    postDetail = postDetail.replace(
      "(*post_full_content*)",
      "(*post_full_content*)" + postCommentsHTML
    );
  }
  return "<box:post_detail>" + postDetail + "</box:post_detail>";
}
function translatePage(post) {
  let pageCode = post.replace("(*post_full_content*)", "(*page_content*)");

  let convert = {
    "(*post": "(*page",
    "box:post": "box:page",
    "view:post": "view:page",
  }
  pageCode = repleaceFromObject(convert, pageCode);

  let notInPage = {
    "(*page_date*)": "",
    "(*page_author*)": "",
    "(*page_seq_num*)": "",
  };
  pageCode = repleaceFromObject(notInPage, pageCode);

  return pageCode;
}
function TranslateOther(_code, options) {
  let code = _code
  code.querySelector("head").innerHTML +=
    "<head:meta></head:meta><head:style></head:style><head:script></head:script>";

  //remove blogfa meta tags
  for (const meta of code.head.querySelectorAll(
    "[http-equiv],title,[name=description],[name=generator],[property*=og],[name*=twitter],[rel=alternate],[name=keywords],link[rel=preconnect]"
  )) {
    meta.remove();
  }
  //comment javascript and form tags
  if (options.commentJs) {
    for (const el of code.querySelectorAll("script,form,input,select,button")) {
      if (el.tagName.toUpperCase() === "BUTTON") {
        var linkEl = document.createElement('a');
        for (var i = 0, l = el.attributes.length; i < l; ++i) {
          linkEl.setAttribute(el.attributes.item(i).nodeName, el.attributes.item(i).nodeValue);
        }
        linkEl.innerHTML = el.innerHTML;
        el.outerHTML = linkEl.outerHTML;
      } else {
        el.outerHTML = "<!--" + el.outerHTML + "-->";
      }
    }
  }

  //add  link_alt attribute
  if (code.getElementsByTagName("view:links")[0]) {
    code
      .getElementsByTagName("view:links")[0]
      .querySelector('a[href="(*link_url*)"]')
      .setAttribute("alt", "(*link_alt*)");
  }
  if (code.getElementsByTagName("view:daily_links")[0]) {
    code
      .getElementsByTagName("view:daily_links")[0]
      .querySelector('a[href="(*link_url*)"]')
      .setAttribute("alt", "(*link_alt*)");
  }
  //replace recent posts 'items' attribute to 'max'
  if (code.getElementsByTagName("view:recent_posts")[0]) {
    let item = code.getElementsByTagName("view:recent_posts")[0];
    item.removeAttribute("items");
  }

  //remove xmlns from svg tags
  for (let svg of code.querySelectorAll("svg")) {
    svg.removeAttribute("xmlns");
    svg.removeAttribute("xmlns:xlink");
  }
  //remove separator attribute from post tags
  for (let view of [
    ...code.getElementsByTagName("view:post_tags"),
    ...code.getElementsByTagName("view:post_categories"),
  ]) {
    if (view.getAttribute("separator")) {
      const separator = view.getAttribute("separator");
      view.innerHTML += separator;
    }
    view.removeAttribute("separator");
  }

  if (code.getElementsByTagName("view:archive")[0]) {
    for (const c of code.getElementsByTagName("view:archive")) {
      c.removeAttribute("maxitems");
      c.removeAttribute("archivetitle");
    }
  }

  if (code.getElementsByTagName("box:page_tags")[0])
    code.getElementsByTagName("box:page_tags")[0].remove();

  if (code.getElementsByTagName("box:page_categories")[0])
    code.getElementsByTagName("box:page_categories")[0].remove();

  return code
}

function extractCSS(_code, options) {
  let code = _code
  let styles = []
  for (let s of code.querySelectorAll("style, link[rel=stylesheet]")) {
    if (s.tagName === "LINK") {
      styles.push(`@import url("${s.href}");`)
    }
    else if (s.tagName === "STYLE") {
      styles.push(s.innerHTML)
    }
    s.remove()
  }
  if (options.addCommentSection) styles.push(postCommentsCSS)
  return {
    html: code,
    css: styles.join("\n/*-*/\n")
  }
}

//generate Bayan Template
function generateBayanTemplate(blogfaTemplate, options) {
  let output = {}
  let all = Object.assign(general, blogfaPagination, blogfaSidebar, blogfaPost);
  let bayanCode = repleaceFromObject(all, blogfaTemplate);
  bayanCode = new DOMParser().parseFromString(bayanCode, "text/html");

  if (options.extractCSS) {
    let { html, css } = extractCSS(bayanCode, options)
    bayanCode = html
    output.css = css
  } else {
    if (options.addCommentSection) bayanCode.body.innerHTML += `<style>${postCommentsCSS}</style>`
  }
  bayanCode = TranslatePost(bayanCode, options);
  bayanCode = TranslateOther(bayanCode, options);

  output.html = "<!DOCTYPE html>" + bayanCode.documentElement.outerHTML
  return output;
}
"use strict";

const general = {
  "<-BlogId->": "(*bog_title*)",
  "<-BlogUrl->": "(*blog_link*)",
  "<-BlogXmlLink->": "(*rss_link*)",
  "<-BlogArchiveLink->": "/archive",

  "<-BlogAuthor->": "(*blog_title*)",
  "<-BlogEmail->": "آدرس ایمیل",
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

const postComments = `<div id="comments_wrapper">
                      <box:post_comments>
                        <div class="comments">
                            <view:post_comments>
                                <div class="comment clear">
                                    <div class="right" style="width:34px">
                                        <img class="avatar" src="(*comment_avatar*)" alt="(*comment_fullname*)">
                                    </div>
                                    <div class="comment_bubble">
                                        <div class="smalltip">
                                            <a href="(*comment_website*)">(*comment_fullname*)</a>
                                            <span>(*comment_date*)</span>
                                        </div>
                                        <div>
                                            (*comment_body*)
                                        </div>
                                    </div>
                                </div>
                                <check:if comment_reply>
                                    <div class="comment is-reply">
                                        <div class="right" style="width:34px">
                                            <img class="avatar" src="(*comment_reply_avatar*)" alt="(*comment_reply_fullname*)">
                                        </div>
                                        <div class="comment_bubble">
                                            <div class="smalltip">
                                                <span>(*comment_reply_fullname*)</span>
                                                <span>(*comment_reply_date*)</span>
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
                  </div>
<style>
.comment_bubble{
border: 1px solid #000;
margin: 10px 44px 10px 0;
padding: 8px;
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
  background: #fff;
  padding: 1rem;
  z-index: 20;
  transform: translateX(-100%);
  transition: 250ms ease;
  overflow: auto;
}
#comments_wrapper:target {
  transform: scale(1);
}
</style>`;

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

function TranslatePost(blogfaCode, options) {
  let parser = new DOMParser();
  let code = parser.parseFromString(blogfaCode, "text/html");
  let blogfaTag = code.querySelector("BLOGFA");

  if (code.querySelector("BlogComment"))
    code.querySelector(
      "BlogComment"
    ).outerHTML = `<a href="(*post_link*)#comments_wrapper">(*post_comment_count*) نظر</a>`;
  code.querySelector("head").innerHTML +=
    "<head:meta></head:meta><head:style></head:style><head:script></head:script>";

  //remove blogfa meta tags
  for (const meta of code.head.querySelectorAll(
    "[http-equiv],[http-equiv],title,[name=description],[name=generator],[property*=og],[name*=twitter],[rel=alternate],[name=keywords],link[rel=preconnect]"
  )) {
    meta.remove();
  }
  //comment javascript and form tags
  if (options.commentJs) {
    for (const el of code.querySelectorAll("script,form,input,select")) {
      el.outerHTML = "<!--" + el.outerHTML + "-->";
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
  let postList = translatePostList(blogfaTag.innerHTML);
  let postFull = translatePostDetial(blogfaTag.innerHTML);
  let page = translatePage(postFull);
  blogfaTag.outerHTML = postList + postFull + page;

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

  return "<!DOCTYPE html>" + code.documentElement.outerHTML;
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
function translatePostDetial(blogfaCode) {
  let postDetail = blogfaCode;

  let postContentAndComment = "(*post_full_content*)" + postComments;

  postDetail = postDetail.replace(
    new RegExp("<check:if.*post_has_read_more.*", "ig"),
    ""
  );
  postDetail = postDetail.replace(
    "(*post_full_content*)",
    postContentAndComment
  );
  return "<box:post_detail>" + postDetail + "</box:post_detail>";
}
function translatePage(post) {
  let pageCode = post.replace("(*post_full_content*)", "(*page_content*)");
  pageCode = pageCode.replaceAll("(*post", "(*page");
  pageCode = pageCode.replaceAll("box:post", "box:page");
  pageCode = pageCode.replaceAll("view:post", "view:page");

  let notInPage = {
    "(*page_date*)": "",
    "(*page_author*)": "",
    "(*page_seq_num*)": "",
  };
  pageCode = repleaceFromObject(notInPage, pageCode);

  return pageCode;
}

//generate Bayan Template
function generateBayanTemplate(blogfaTemplate, options) {
  let bayanCode = repleaceFromObject(general, blogfaTemplate);
  bayanCode = repleaceFromObject(blogfaPagination, bayanCode);
  bayanCode = repleaceFromObject(blogfaSidebar, bayanCode);
  bayanCode = repleaceFromObject(blogfaPost, bayanCode);
  bayanCode = TranslatePost(bayanCode, options);
  return bayanCode;
}

const blogfa = document.querySelector("#blogfa"),
  bayan = document.querySelector("#bayan");

document.querySelector(".btn").addEventListener("click", () => {
  try {
    bayan.innerText = generateBayanTemplate(blogfa.value, {
      commentJs: document.querySelector("#commentJs").value,
    });
  } catch (e) {
    console.log(e);
    bayan.innerText = e;
  }
});

{
    let s='bbb_bb_b';
    let al=/b+/g;
    let a2=/b+/y;
    console.log(al.exec(s),a2.exec(s));
    console.log(al.exec(s),a2.exec(s));
    /*sticky是check 正则中是否带有y修饰符*/
    console.log(al.sticky,a2.sticky);
}
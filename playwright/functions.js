/* function for forcing psuedo states on to elements for visual tests */
export const forceState = async (tree, selector, state = "") => {
  // create a Chrome Devtools session
  const cdp = await tree.page().context().newCDPSession(tree.page());

  const { nodeId } = (await cdp.send("DOM.getDocument")).root;

  const { nodeIds } = await cdp.send("DOM.querySelectorAll", {
    nodeId,
    selector,
  });

  await cdp.send("CSS.enable");

  for (const node of nodeIds) {
    await cdp.send("CSS.forcePseudoState", {
      nodeId: node,
      forcedPseudoClasses: [].concat(state),
    });
  }

  return true;
};
